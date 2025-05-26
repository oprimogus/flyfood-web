<script setup lang="ts"></script>

<template>
    <footer
        class="footer md:footer-horizontal bg-primary text-neutral-content p-10"
    >
        <!-- Branding -->
        <div class="flex flex-col gap-2 max-w-sm">
            <aside>
                <img
                    src="@/assets/flyfood/logo/flyfood-white.svg"
                    alt="FlyFood Logo"
                    class="text-base-content w-16 h-16"
                />
            </aside>
            <p class="font-bold text-lg">FlyFood</p>
            <p class="text-sm leading-relaxed break-words">
                Conectando você ao melhor da sua região, sem taxas extras.
            </p>
        </div>

        <!-- Links rápidos -->
        <nav>
            <h6 class="footer-title">Links Rápidos</h6>
            <a href="_blank" class="link link-hover"> Sobre nós </a>
        </nav>

        <nav>
            <h6 class="footer-title">Para Lojas</h6>
            <a href="_blank" class="link link-hover">
                Cadastre seu Negócio
            </a>
            <a href="_blank" class="link link-hover"> Painel do Negócio </a>
            <a href="_blank" class="link link-hover"> Benefícios </a>
        </nav>

        <nav>
            <h6 class="footer-title">Contato</h6>
            <a href="_blank" class="link link-hover">
                contato@flyfood.com.br
            </a>
            <a href="_blank" class="link link-hover"> (13) 99999-9999 </a>
        </nav>
    </footer>
</template>
