<script>
  import { onMount, afterUpdate } from "svelte"
  export let id

  let verses
  let lineIndex = 1

  async function getChapter(id) {
    const request = await fetch(
      `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${id}`
    )
    const data = await request.json()
    return data
    // verses = id === 1 ? data.verses.slice(1) : data.verses
  }

  // console.log("🚀 ~ file: Quran.svelte ~ line 25 ~ verses", verses)
  function liningUp() {
    // do something after lining
    document
      .querySelector(`#quran .line[index="${lineIndex}"]`)
      ?.classList.add("selected-line")
    console.log(
      "yahaan aaya??",
      document.querySelector(`#quran .line[index="${lineIndex}"]`)
    )
  }

  onMount(async () => {
    const chapter = await getChapter(id)
    verses = id === 1 ? chapter.verses.slice(1) : chapter.verses

    // document
    //   .querySelector(`.arabic .line[index="${lineIndex}"]`)
    //   ?.classList.add("selected-line")
    // console.log(
    //   "yahaan aaya??",
    //   document.querySelector(`.arabic .line[index="${lineIndex}"]`)
    // )
    // const quran = document.getElementById("quran")
    // console.log(
    //   "🚀 ~ file: Quran.svelte ~ line 42 ~ onMount ~ document.(quran)",
    //   quran
    // )
    // quran?.addEventListener("afterlining", liningUp, false)
    // const lll = lining(quran, {
    //   // optional config
    //   autoResize: true,
    //   to: 2,
    //   from: 1,
    //   lineClass: "selected-line",
    // })
    // lll.relining()
    // liningUp()
    // lll.selectLine(1)

    // setTimeout(() => {
    //   // lll.unlining()
    //   lll.relining()
    // }, 3000)
  })

  afterUpdate(() => {
    const quran = document.getElementById("quran")
    console.log(
      "🚀 ~ file: Quran.svelte ~ line 66 ~ afterUpdate ~ document.(quran)",
      quran
    )
    quran?.addEventListener("afterlining", liningUp, false)
    if (quran) {
      const liningQuran = lining(quran, {
        // optional config
        autoResize: true,
        // to: 2,
        from: 0,
        // lineClass: "selected-line",
      })
      console.log("y!!!!!!!!!!!!!!?????????????????")
      // liningUp()
      // liningQuran.unlining()
      // liningQuran.relining()
    }
  })

  function toArabic(num) {
    const arabic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

    const digits = num.toString().split("")
    return digits.map((n) => arabic[Number(n)]).join("")
  }

  function arrowUpHandler() {
    const currentLine = document.querySelector(
      `.arabic .line[index="${lineIndex}"]`
    )
    const previousLine = document.querySelector(
      `.arabic .line[index="${lineIndex - 1}"]`
    )
    if (!previousLine) {
      if (id > 1) {
        // return navigate(`/${id - 1}`, {
        //   // replace: true,
        // })
        return (window.location.href = window.location.origin + `/${id - 1}`)
      }
      return
    }
    currentLine.classList.remove("selected-line")
    previousLine.classList.add("selected-line")
    previousLine.scrollIntoView({ block: "center" })
    return (lineIndex -= 1)
  }

  function arrowDownHandler() {
    const currentLine = document.querySelector(
      `.arabic .line[index="${lineIndex}"]`
    )
    const nextLine = document.querySelector(
      `.arabic .line[index="${lineIndex + 1}"]`
    )
    if (!nextLine) {
      if (id >= 1 && id < 114) {
        // id += 1
        // return navigate(`/${id + 1}`, {
        //   // replace: true,
        // })
        return (window.location.href = window.location.origin + `/${id + 1}`)
      }
      return
    }
    currentLine.classList.remove("selected-line")
    nextLine.classList.add("selected-line")
    nextLine.scrollIntoView({ block: "center" })
    return (lineIndex += 1)
  }

  function onKeyDown(event) {
    console.log(event)
    const callback = {
      // ArrowLeft: arrowLeftHandler,
      // ArrowRight: arrowRightHandler,
      ArrowUp: arrowUpHandler,
      ArrowDown: arrowDownHandler,
    }[event.key]
    callback?.()
  }

  // document.getElementById("quran")?.addEventListener("keydown", onKeyDown)

  // var poemLining = lining(document.getElementById("quran"), {
  //   // optional config
  //   autoResize: true,
  //   from: 2,
  //   to: 3,
  //   lineClass: "my-class",
  // })

  // console.log(lining)
</script>

<svelte:window on:keydown={onKeyDown} />

<main>
  <!-- on:afterlining={liningUp}
data-lining
data-auto-resize -->
  {#if verses?.length}
    <section class="arabic" id="quran" on:keydown={onKeyDown}>
      <!-- <ol> -->
      {#each verses as verse, index (verse.id)}
        <!-- <li> -->
        {verse.text_indopak}
        <span class="verse-separator">
          {toArabic(index + 1)}
        </span>
        <!-- </li> -->
      {/each}
      <!-- </ol> -->
    </section>
    <!-- <h1>Surah end</h1> -->
  {/if}
</main>

<style>
  main {
    text-align: justify;
    margin: 100px 0;
    font-size: 10ch;
    word-spacing: 0.5ch;
    text-align: justify;
    /* width: 9ch; */
  }

  .verse-separator {
    /* display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: row; */
    font-family: UthmanicHafs1;
  }

  :global(.selected-line) {
    color: white;
    background-color: #009600;
  }

  :global(text-line) {
    padding: 1rem;
    /* margin: 0 auto; */
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
