<script>
  import { onMount } from 'svelte';

  let students = [];
  let newStudent = '';

  function throwError(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  function catchError(error) {
    console.error(error);
    alert('Something went horribly wrong. See browser log.');
  }

  async function getStudents() {
    const url = '/api/students';
    try {
      const res = await fetch(url);
      throwError(res);
      students = await res.json();
    } catch (error) {
      catchError(error);
    }
  }

  async function insertStudent() {
    if(newStudent === '') return;
    const url = '/api/student/';
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({name:newStudent}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      throwError(res);
      getStudents();
      newStudent = '';
    } catch (error) {
      catchError(error);
    }
  }

  async function updateStudent(event, id, i) {
    const url = '/api/student/' + id;
    const form = document.getElementById('form');
    let res, index;

    try {
      if(students[i].name === '') {
        res = await fetch(url, {method: 'DELETE'});
        throwError(res);
        index = [...form].indexOf(event.target);
      } else {
        res = await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify({name:students[i].name}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        throwError(res);
        index = [...form].indexOf(event.target) + 1;
      }
      await getStudents();
      form.elements[index].select();
    } catch (error) {
      catchError(error);
    }
  }

  onMount(getStudents);

</script>

<main>
  <h2>{students.length} students</h2>

  <form id="form">
    <ul>
    {#each students as student, i}
      <li>
        <input type="text" bind:value={student.name} 
        on:keypress={(event) => {
          if (event.key === 'Enter') updateStudent(event, student.id, i);
        }}
        >
        <a href="#/student/{student.id}">View</a>
      </li>
    {:else}
      <li class="no">There are no students</li>
    {/each}
      <li>
        <input id="name" type="text" placeholder="Name" bind:value={newStudent} 
          on:keypress={(event) => {
            if (event.key === 'Enter') insertStudent();
          }}
        >
      </li>
    </ul>
  </form>

</main>

<style>
ul {
  list-style-type: none;
  margin: 0 0 2rem 0;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  margin-bottom: -1px;
  display: flex;
  align-items: center;
}
li:hover {
  background-color: #f3f3fb;
}
a {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 1rem;
  margin-left: 1rem;
  margin-right: -1px;
  text-align: center;
}
a:hover {
  text-decoration: underline;
  color: #2575e4;
}
input {
  display: block;
  font: inherit;
  font-size: inherit;
  line-height: inherit;
  color: #000;
  outline: none;
  padding: 1rem 0.8rem;
  border-width: 0;
  margin: 0;
  margin-right: -1px;
  flex-basis: 100%;
  flex-shrink: 1;
  background-color: transparent;
}
.no {
  border-width: 0;
  padding: 0 0 2rem 0;
  color: #fa0a0a;
}
::placeholder {
  color: #aaa;
  opacity: 1;
}
</style>
