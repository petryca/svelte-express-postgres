<script>
  export let params;
  import { onMount } from 'svelte';

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

  let student = {};

  onMount(async () => {
    const url = '/api/student/' + params.id;
    try {
      const res = await fetch(url, {method: 'GET'});
      throwError(res);
      student = await res.json();
    } catch (error) {
      catchError(error);
    }

  });
</script>

<main>
<h2>{student.name}</h2>

</main>
