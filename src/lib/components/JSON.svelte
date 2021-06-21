<script>
  import Button from '$lib/components/Button.svelte';
  export let obj: Record<string, any> = {},
    inline = false;
  let json: string;
  let show: boolean;

  $: json = JSON.stringify(obj, null, 2)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match) {
        var color = 'darkorange'; // number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            color = 'red'; // key
          } else {
            color = 'green'; // string
          }
        } else if (/true|false/.test(match)) {
          color = 'blue'; // boolean
        } else if (/null/.test(match)) {
          color = 'magenta'; // null
        }
        return '<span style="color:' + color + '">' + match + '</span>';
      }
    );
</script>

<Button onclick={() => (show = true)} color="black" form="outline">
  View Data
</Button>

{#if show}
  <div class:fullscreen={!inline}>
    <Button color="orange" onclick={() => (show = false)}>Hide</Button>
    <pre style="white-space:pre-wrap; font-size: 12px;">
      {@html json}
    </pre>
  </div>
{/if}

<style>
  .fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: white;
    z-index: 100;
    overflow-y: auto;
  }
</style>
