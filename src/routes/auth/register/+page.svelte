<script>
  import "../../../app.css";
  import google from "$lib/public/assets/google.svg";
  import poster from "$lib/public/assets/bg.jpg";
  import toast, { Toaster } from "svelte-french-toast";
  import { envDataConf } from "../../../server/server";

  // @ts-ignore
  let formData = {
    username: "",
    lastName: "",
    userEmail: "",
    isStudent: false,
    reasonsToUseApp: "",
    password: "",
  };

  const formHandler = async () => {
    try {
      const saveUser = await fetch(
        `${envDataConf.URLBACK}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );
      console.log(saveUser);

      if (!saveUser.ok && saveUser.status !== 201 && saveUser.status !== 200) {
        return toast.error(
          "ha habido un error al intentar registrarte, vuelve a intentar más tarde o intenta con otro nombre y correo"
        );
      } else if (saveUser.statusText === "400" && saveUser.status === 400) {
        return toast.error("el usuario ingresado ya éxiste");
      } else if (saveUser.ok) {
        toast.success("registrado éxitosamente");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }

      console.log(saveUser.status);

      saveUser.status === 400 ? console.log("si") : console.log("no");
    } catch (error) {
      console.error(error);
      throw new Error("bad request");
    }
  };

  // todo: auth methods here
  const handleAuthGithub = () => {
    const client_id = "df98834eb79fa591677f";

    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + client_id
    );
  };

  const handleAuthGoogle = () => {
    // progress...
  };
  // finish auth methods
</script>

<Toaster />

<div class="2xl:container h-screen m-auto">
  <div hidden class="fixed inset-0 w-7/12 lg:block">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class="w-full h-full object-cover" loop autoplay {poster}></video>
  </div>
  <!-- svelte-ignore a11y-unknown-role -->
  <div
    hidden
    role="hidden"
    class="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"
  ></div>
  <div class="relative h-full ml-auto lg:w-6/12">
    <div class="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
      <div class="space-y-4">
        <p class="text-xl" style="font-size: 60px;">Learnflow AI</p>
        <p class="font-medium text-lg text-gray-600">
          Bienvenido a Learnflow AI. Crea una cuenta y comienza la magia!
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <button
          class="py-3 px-6 rounded-xl bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200"
        >
          <div class="flex gap-4 justify-center">
            <img src={google} class="w-5" alt="" />
            <button
              class="block w-max font-medium tracking-wide text-sm text-blue-700"
              on:click={handleAuthGoogle}>Google</button
            >
          </div>
        </button>
        <button
          class="py-3 px-6 rounded-xl bg-gray-900 transition hover:bg-gray-800 active:bg-gray-600 focus:bg-gray-700"
        >
          <div class="flex gap-4 items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="w-5"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <button
              class="block w-max font-medium tracking-wide text-sm text-white"
              on:click={handleAuthGithub}>Github</button
            >
          </div>
        </button>
      </div>

      <!-- dsklslaklñdkslñdkdslñ{dkñ{d}} -->
      <!-- svelte-ignore a11y-unknown-role -->
      <div role="hidden" class="mt-12 border-t">
        <span
          class="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white"
          >o</span
        >
      </div>
      <!-- git y github_ -->

      <form on:submit|preventDefault={formHandler} class="space-y-6 py-6">
        <div class="flex flex-col">
          <label class="pb-2 font-bold" for="">Nombres</label>
          <input
            type="text"
            placeholder="Addm..."
            bind:value={formData.username}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-gray-500 focus:invalid:outline-none"
          />
        </div>
        <div class="flex flex-col">
          <label class="pb-2 font-bold" for="">Apellidos</label>
          <input
            type="text"
            placeholder="Ale... Pol..."
            bind:value={formData.lastName}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-gray-500 focus:invalid:outline-none"
          />
        </div>
        <div class="flex flex-col">
          <label class="pb-2 font-bold" for=""
            >Razón para usar el programa</label
          >
          <input
            type="text"
            placeholder="Addmer"
            bind:value={formData.reasonsToUseApp}
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-gray-500 focus:invalid:outline-none"
          />
        </div>

        <!-- <div>
          <input
            type="text"
            placeholder="Apellido"
            bind:value={formData.lastName}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
          />
        </div> -->

        <div class="flex flex-col">
          <label class="pb-2 font-bold" for="">Correo electronico</label>
          <input
            type="email"
            placeholder="example@xyz.com"
            bind:value={formData.userEmail}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-gray-500 focus:invalid:outline-none"
          />
        </div>

          <div class="flex flex-col">
          <label class="pb-2 font-bold" for="">Contraseña</label>
          <input
            type="password"
            placeholder="*********"
            bind:value={formData.password}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-gray-500 focus:invalid:outline-none"
          />
        </div>

        <!-- <div>
          <select
            bind:value={formData.isStudent}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
          >
            <option value="" disabled selected>¿Eres estudiante?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div> -->

        <div class="flex flex-col items-end">
          <!-- <input
            type="text"
            placeholder="¿Por que quieres usar LearnflowAI?"
            bind:value={formData.reasonsToUseApp}
            required
            class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
          /> -->
        </div>

        <div>
          <button
            class="w-full px-6 py-3 rounded-full bg-sky-500 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
          >
            <span class="font-semibold text-white text-lg">Crear cuenta</span>
          </button>

          <div class="flex justify-between">
            <a href="/auth/login" type="reset" class="w-max p-3 -ml-3">
              <span class="text-sm tracking-wide text-blue-600"
                >Ya tengo una cuenta</span
              >
            </a>
            <button type="reset" class="w-max p-3 -mr-3">
              <span class="text-sm tracking-wide text-blue-600"
                >Olvidé mi contraseña
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- tailwind -->