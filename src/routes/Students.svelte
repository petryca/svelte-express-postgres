<script>
  import { onMount } from 'svelte';

  let students = [];
  let newStudent = '';

  async function getStudents() {
    const url = '/api/students';
    try {
      const res = await fetch(url, {method: 'GET'});
      students = await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function insertStudent() {
    const url = '/api/student/';
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({name:newStudent}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getStudents();
      newStudent = '';
    } catch (error) {
      console.error(error);
    }

  }

  async function deleteStudent(id) {
    const url = '/api/student/' + id;
    try {
      await fetch(url, {method: 'DELETE'});
      getStudents();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(getStudents);

</script>

<main>
  <h2>{students.length} students</h2>

  <ul>
  {#each students as student}
    <li>
      <a href="#/student/{student.id}">{student.name}</a>
      <button on:click={() => deleteStudent(student.id)}>Delete</button>
    </li>
  {:else}
    <li><a href>There are no students</a></li>
  {/each}
  </ul>

  <form on:submit|preventDefault={insertStudent}>
    <label for="name">New student</label>
    <input id="name" type="text" bind:value={newStudent} required>
    <button type="submit">Insert</button>
  </form>
</main>

<style>
ul {
  list-style-type: none;
  margin: 0 0 2rem 0;
  padding: 0;
}
li {
  margin-bottom: -1px;
  display: flex;
}
li:hover {
  background-color: #eee;
}
li a {
  display: block;
  flex-grow: 1;
  color: inherit;
  text-decoration: none;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  margin-right: -1px;
}
form {
  display: flex;
}
label, input {
  display: block;
  font: inherit;
  outline: none;
}
label {
  border: 1px solid #ccc;
  line-height: 1;
  padding: 0.8rem;
  margin-right: -1px;
}
input {
  flex-grow: 1;
  padding: 0 0.8rem;
  border: 1px solid #ccc;
  margin: 0;
  margin-right: -1px;
}
button {
  cursor: pointer;
  font: inherit;
  padding: 0 2rem;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 9rem;
  color: #555;
  margin: 0;
}
button:hover {
  background-color: #ddd;
}
</style>
