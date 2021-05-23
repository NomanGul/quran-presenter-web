<script>
  import { Router, Route } from "svelte-routing"
  import Quran from "./Quran.svelte"

  export let url = ""
</script>

<Router {url}>
  <Route path="/">Hi!</Route>
  <Route path="/:id" let:params>
    <Quran id={Number(params.id)} />
  </Route>
</Router>
