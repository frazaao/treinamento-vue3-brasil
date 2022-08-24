<template>
  <header class="h-[700px] bg-brand-main w-full flex justify-center">
    <div class="header-group">
      <div class="flex justify-between py-10 items-center">
        <picture class="w-28 lg:w-36">
          <img
            class="w-full"
            src="../../assets/images/logo_white.png"
            alt="Logotipo"
          />
        </picture>
        <nav>
          <ul class="flex">
            <li>
              <button
                class="hover:brightness-95 transition-all px-6 py-2 font-bold rounded-full text-white focus:outline-none"
                @click="() => emit('create-account')"
              >
                Crie uma conta
              </button>
            </li>

            <li>
              <button
                class="hover:brightness-95 transition-all px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
                @click="() => emit('login')"
              >
                Entrar
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedback. <br />
          E faça seus clientes mais <br class="hidden lg:inline-block" />
          felizes!
        </h1>
        <p class="text-lg font-regular text-white">
          Receba ideias, reclamações e feedbacks com um
          <br class="hidden lg:inline-block" />
          simples widget na página.
        </p>
        <div>
          <button
            class="hover:scale-105 transition-all mt-10 px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
          >
            Crie uma conta grátis
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup(_, { emit }) {
    return { emit };
  },
};
</script>

<style lang="postcss" scoped>
.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

@media (min-width: 600px) {
  .header-group {
    background-image: url("../../assets/images/blue_balloons.png");
    background-size: 622px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
