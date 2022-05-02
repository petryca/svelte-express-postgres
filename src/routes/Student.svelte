<script>
  export let params;
  import { onMount } from 'svelte';

  let student = {};

  onMount(async () => {
    const url = '/api/student/' + params.id;
    try {
      const res = await fetch(url, {method: 'GET'});
      student = await res.json();
    } catch (error) {
      console.error(error);
    }

  });
</script>

<main>
<h2>{student.name}</h2>

</main>
