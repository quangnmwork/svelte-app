<script>
   import { page } from '$app/state';
   console.log(page.error);
</script>

<h1>Error</h1>
<p>{page.error?.message}</p>