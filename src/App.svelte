<script>
	import Router, {link} from 'svelte-spa-router';
	import Students from './routes/Students.svelte';
	import Student from './routes/Student.svelte';

	const routes = {
		'/': Students,
		'/student/:id': Student
	};
</script>


<main>
	<Router {routes} />
</main>
