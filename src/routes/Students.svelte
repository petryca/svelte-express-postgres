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
      const res = await fetch(url, {method: 'GET'});
      throwError(res);
      students = await res.json();
      for(const s of students) {
        s.newName = '';
      }
    } catch (error) {
      catchError(error);
    }
  }

  async function insertStudent() {
    if(newStudent === '') return alert('Type student name');
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

  async function deleteStudent(id) {
    if(!confirm('Are you sure?')) return;
    const url = '/api/student/' + id;
    try {
      const res = await fetch(url, {method: 'DELETE'});
      throwError(res);
      getStudents();
    } catch (error) {
      catchError(error);
    }
  }

  async function updateStudent(id, i) {
    if(students[i].newName === '') return alert('Type new name');
    const url = '/api/student/' + id;
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({name:students[i].newName}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      throwError(res);
      getStudents();
      students[i].newName = '';
    } catch (error) {
      catchError(error);
    }
  }

  onMount(getStudents);

</script>

<main>

  <h2>{students.length} students</h2>

  <ul>
  {#each students as student, i}
    <li>
      <input type="text" placeholder="{student.name}" bind:value={students[i].newName}>
      <a href on:click|preventDefault={() => updateStudent(student.id, i)}>Update</a>
      <a href="#/student/{student.id}">View</a>
      <a href on:click|preventDefault={() => deleteStudent(student.id)}>Delete</a>
    </li>
  {:else}
    <li class="no">There are no students</li>
  {/each}
  </ul>

  <div>
    <input id="name" type="text" placeholder="Name" bind:value={newStudent}>
    <a href on:click|preventDefault={insertStudent}>Insert</a>
  </div>

</main>

<style>
ul {
  list-style-type: none;
  margin: 0 0 2rem 0;
  padding: 0;
}
li, div {
  border: 1px solid #ccc;
  margin-bottom: -1px;
  display: flex;
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
a:last-child:hover {
  color: #fa0a0a;
}
div > a:last-child:hover {
  color: #06bc1e;
}
input {
  display: block;
  font: inherit;
  outline: none;
  padding: 0 0.8rem;
  border-width: 0;
  margin: 0;
  margin-right: -1px;
  flex-basis: 100%;
  flex-shrink: 1;
  background-color: transparent;
  color: #2575e4;
}
input::placeholder {
  color: black;
  opacity: 1;
}
.no {
  border-width: 0;
  color: #fa0a0a;
}
</style>
