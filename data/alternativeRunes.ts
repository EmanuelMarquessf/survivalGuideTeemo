
import type { AlternativeMatchupData, AlternativeRunesRoot } from '../types';
import { normalizeChampionNameForMapKey } from '../constants';

const rawAlternativeJsonData = `{
  "metadata": {
    "streamer_twitch": "https://www.twitch.tv/ipav999",
    "streamer_youtube": "https://www.youtube.com/ivanpavlovteemo",
    "item_set_link": "https://cdn.discordapp.com/attachments/750917210683342938/939386121861890068/iPavs_Teemo_V12.3.json",
    "strategy_info": {
      "patch": "v14.13",
      "date": "6/28/2024",
      "description": "AP only. No more on-hit on Teemo."
    },
    "default_setup": {
      "runes": "FF, AbsL, Alac, CutD / ToB UItH / As, MS, Shp",
      "summoner_spells": "Ignite F"
    },
    "bans": [
      "Skarner",
      "Asol"
    ]
  },
  "matchups": [
    {
      "champion": "Aatrox",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Precisão ou Dominação",
        "secondary_runes": ["Triunfo", "Dilacerar", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Botas + 4 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Tocha de Fogo Negro", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Chamuscar"],
        "secondary_tree": "Inspiração",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Botas + 4 Poções", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Akali",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Botas", "Tormento de Liandry", "Passos de Mercúrio", "Dente de Nashor ou Limite da Razão", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Tocha de Fogo Negro"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Limite da Razão", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern"],
      "experiences": "Kite! Mantenha o Cinto-revólver durante a lane",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Annie",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Botas", "Tormento de Liandry", "Passos de Mercúrio", "Dente de Nashor ou Limite da Razão", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Tocha de Fogo Negro"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Limite da Razão", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern"],
      "experiences": "Sobreviva aos Tibbers dela. Use Cinto-revólver durante a lane.",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Aurora",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Botas", "Tormento de Liandry", "Passos de Mercúrio", "Dente de Nashor ou Limite da Razão", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Tocha de Fogo Negro"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Limite da Razão", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern"],
      "experiences": "LVL 1 All In",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Briar",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Morellonomicon", "ou", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Camille",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Morellonomicon", "ou", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Limite da Razão"],
      "experiences": "Cuidado com o gank do JG inimigo",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Cassiopeia",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Adaga + 4 Poções", "Cetro de Cristal de Rylai", "Botas da Rapidez", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Morellonomicon ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Adaga", "Cetro de Cristal de Rylai", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal"],
      "experiences": "All in LvL1, Se não, jogue seguro até o Cetro de Cristal de Rylai",
      "difficulty": "10/10 Hard"
    },
    {
      "champion": "Cho'Gath",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Darius",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Botas + 2 Poções", "Botas da Rapidez", "Anel de Doran", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Diana",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Grevas do Berserker", "Tormento de Liandry", "Dente de Nashor ou Limite da Razão", "Capuz da Morte de Rabadon", "Véu da Banshee", "Cajado do Vazio"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Capa de Negatrons (componente)", "Grevas do Berserker", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern"],
      "experiences": "Kite!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Dr. Mundo",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Precisão ou Dominação",
        "secondary_runes": ["Lenda: Espontaneidade", "Dilacerar", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Orbe do Oblívio (componente)", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Ekko",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Capuz da Morte de Rabadon", "Florescera Espectral", "Chama Sombria ou Véu da Banshee"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal"],
      "experiences": "Kite!",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Fiora",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Orbe do Oblívio (componente)", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Faixa de Fluxo de Mana", "Celeridade", "Chamuscar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran ou Armadura de Pano", "Botas Revestidas de Aço", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal"],
      "experiences": "Kite! Comece com Armadura de Pano se Fiora tiver Incendiar, senão Anel de Doran.",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Fizz",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Passos de Mercúrio", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Capa de Negatrons (componente)", "Grevas do Berserker", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus"],
      "experiences": "Kite! Não tenho certeza.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Galio",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Passos de Mercúrio", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee ou Chama Sombria"],
      "on_hit_runes": "Não disponível",
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Limite da Razão", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern"],
      "experiences": "Kite! Cuidado com a preparação para ganks.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Gangplank",
      "ap_runes": {
        "primary_tree": "Precisão ou Determinação",
        "keystone": "Agilidade nos Pés ou Aperto dos Mortos-Vivos",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão / Vida (Escalonável)"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Garen",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Cristal de Rubi (componente)", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Cristal de Rubi (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Gnar",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Gragas",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Cristal de Rubi (componente)", "Manto Anula-Magia (componente)", "Botas da Rapidez", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Golpe de Misericórdia"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Resistência Mágica"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Mata-Cráquens"],
      "experiences": "Kite e Cuidado com os posicionamentos do R dele.",
      "difficulty": "3~8/10 Hard"
    },
    {
      "champion": "Gwen",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Orbe do Oblívio (componente)", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Véu da Banshee"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Mata-Cráquens"],
      "experiences": "Kite!",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Hecarim",
      "ap_runes": "Não disponível",
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": "Não disponível",
      "on_hit_runes": "Não disponível",
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": "Não disponível",
      "experiences": "Não disponível",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Heimerdinger",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Botas + 4 Poções", "Passos de Mercúrio", "Espada do Rei Destruído", "Limite da Razão", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern"],
      "experiences": "Empurre o mais rápido possível.",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Illaoi",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções ou Botas + 4 Poções", "Botas da Rapidez", "Orbe do Oblívio (componente)", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Morellonomicon ou Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran ou Botas + 4 Poções", "Botas da Rapidez", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal"],
      "experiences": "Evite o E dela",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Irelia",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Orbe do Oblívio (componente)", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Lembrete Mortal"],
      "experiences": "Evite o stun dela",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Jarvan IV",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Evite o combo E-Q dele",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Jax",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Ampulheta de Zhonya", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Kite!",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Jayce",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Ampulheta de Zhonya", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Jogue bem.",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Karma",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar?", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Véu da Banshee", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Golpe de Misericórdia"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Cuidado com a preparação para ganks.",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Karthus",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar?", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Véu da Banshee", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Golpe de Misericórdia"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Vá para a kill o máximo possível.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Kassadin",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Véu da Banshee", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés ou Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Golpe de Misericórdia"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Negue ele.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Katarina",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Véu da Banshee", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés ou Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Golpe de Misericórdia"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Não subestime ela antes do nível 6.",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Kayle",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Véu da Banshee", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Não subestime ela antes do nível 6.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Kennen",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Dente de Nashor ou Limite da Razão", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Véu da Banshee", "Capuz da Morte de Rabadon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Capa de Negatrons (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Limite da Razão", "Terminus"],
      "experiences": "Cuidado com a preparação para ganks.",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Kled",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Morellonomicon ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus ou Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Pode precisar de incendiar, não tenho certeza, teste necessário.",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Lucian",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Couraça do Defunto"],
      "experiences": "Cuidado no início de nível.",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Lissandra",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão ou Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee ou Bandana de Mercúrio"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus ou Lembrete Mortal", "Jak'Sho, O Proteico", "Bandana de Mercúrio"],
      "experiences": "Jogue agressivamente.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Malphite",
      "ap_runes": {
        "primary_tree": "Determinação",
        "keystone": "Aperto dos Mortos-Vivos ou Agilidade nos Pés",
        "primary_runes": ["Demolir", "Ventos Revigorantes", "Crescimento Excessivo"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Véu da Banshee"],
      "on_hit_runes": {
        "primary_tree": "Determinação",
        "keystone": "Aperto dos Mortos-Vivos",
        "primary_runes": ["Demolir", "Ventos Revigorantes", "Crescimento Excessivo"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Kaenic Rookern ou manter Limite da Razão"],
      "experiences": "Cuidado com o all-in no nível 6 e a preparação para ganks.",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Malzahar",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Bandana de Mercúrio", "Botas da Rapidez", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Capuz da Morte de Rabadon", "Florescera Espectral"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Bandana de Mercúrio", "Botas da Rapidez", "Espada do Rei Destruído", "Limite da Razão", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico"],
      "experiences": "Bandana de Mercúrio até o nível 6.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Maokai",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma?", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Chama Sombria ou Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico"],
      "experiences": "Cuidado com Ganks.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Mordekaiser",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar?", "Flash"],
      "ap_items": ["Botas + 4 Poções?", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Véu da Banshee ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Botas + 4 Poções", "Botas da Rapidez", "Espada do Rei Destruído", "Mata-Cráquens", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico"],
      "experiences": "Jogue agressivamente pré-6.",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Morgana",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee ou Bandana de Mercúrio"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Cimitarra Mercurial", "Terminus", "Jak'Sho, O Proteico"],
      "experiences": "Jogue agressivamente.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Nasus",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Orbe do Oblívio (componente)", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Morellonomicon ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Cimitarra Mercurial"],
      "experiences": "Tente pegar Orbe do Oblívio no início do jogo.",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Neeko",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Limite da Razão ou Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Véu da Banshee ou Tocha de Fogo Negro"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Cimitarra Mercurial"],
      "experiences": "Evite os pokes dela.",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Nocturne",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma?", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Bandana de Mercúrio"],
      "experiences": "Kite!",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Olaf",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções ou Botas + 4 Poções", "Botas da Rapidez", "Dente de Nashor", "Orbe do Oblívio (componente)", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya ou Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran ou Botas + 4 Poções", "Botas da Rapidez", "Espada do Rei Destruído", "Mata-Cráquens", "Lâmina da Fúria de Guinsoo", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "7/10 Hard"
    },
    {
      "champion": "Ornn",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Cuidado com Ganks.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Pantheon",
      "ap_runes": {
        "primary_tree": "Determinação",
        "keystone": "Aperto dos Mortos-Vivos ou Agilidade nos Pés",
        "primary_runes": ["Demolir", "Osso Revestido", "Crescimento Excessivo"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "Evite as lanças dele, Cegue quando ele atordoar. Cuidado com ganks.",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Poppy",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Cuidado com Ganks.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Pyke",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "Cuidado com Ganks.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Quinn",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "Cuidado com Ganks.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Rammus",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Bandana de Mercúrio"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Cimitarra Mercurial"],
      "experiences": "Cuidado com Ganks.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Rek'Sai",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Renekton",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Rengar",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Aperto dos Mortos-Vivos",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Golpe de Misericórdia"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "Não fique perto do alcance de pulo dele nos arbustos.",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Riven",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Couraça do Defunto ou Limite da Razão"],
      "experiences": "O nível 1 importa mais.",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Rumble",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Malignância", "Florescera Espectral", "Ampulheta de Zhonya", "Véu da Banshee", "Dente de Nashor (em vez de Limite da Razão)"],
      "on_hit_runes": {
        "primary_tree": "Determinação",
        "keystone": "Aperto dos Mortos-Vivos",
        "primary_runes": ["Demolir", "Ventos Revigorantes", "Crescimento Excessivo"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Jak'Sho, O Proteico", "Terminus", "Mata-Cráquens"],
      "experiences": "Nível 3~4 tenha cuidado. Apenas fique no zero a zero.",
      "difficulty": "9/10 Hard"
    },
    {
      "champion": "Ryze",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Véu da Banshee", "Dente de Nashor (em vez de Limite da Razão)"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Limite da Razão", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Terminus", "Jak'Sho, O Proteico", "Bandana de Mercúrio"],
      "experiences": "Jogue agressivamente no início do jogo.",
      "difficulty": "9/10 Hard"
    },
    {
      "champion": "Sett",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Chamuscar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Botas + 4 Poções", "Bandana de Mercúrio", "Anel de Doran", "Botas da Rapidez", "Dente de Nashor", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Tormento de Liandry"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Chamuscar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Botas + 4 Poções", "Bandana de Mercúrio", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus ou Lembrete Mortal", "Jak'Sho, O Proteico", "Cimitarra Mercurial"],
      "experiences": "QSS (Bandana de Mercúrio) o mais rápido possível!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Shen",
      "ap_runes": {
        "primary_tree": "Determinação",
        "keystone": "Aperto dos Mortos-Vivos",
        "primary_runes": ["Demolir", "Osso Revestido", "Crescimento Excessivo"],
        "secondary_tree": "Dominação",
        "secondary_runes": ["Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Bandana de Mercúrio"],
      "experiences": "Shen é forte no 1v1 no início do jogo.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Singed",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Chamuscar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Véu da Banshee", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Chamuscar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "1/10 Easy"
    },
    {
      "champion": "Sion",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Botas + 4 Poções", "Botas da Rapidez", "Anel de Doran", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Ampulheta de Zhonya", "Capuz da Morte de Rabadon", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Agilidade nos Pés",
        "primary_runes": ["Cura Excessiva", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembranças do Lorde Dominik", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Skarner",
      "ap_runes": "Perma ban.",
      "ap_ss": "Não disponível",
      "ap_items": "Não disponível",
      "on_hit_runes": "Não disponível",
      "on_hit_ss": "Não disponível",
      "on_hit_items": "Não disponível",
      "experiences": "Dodge",
      "difficulty": ""
    },
    {
      "champion": "Soraka",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Véu da Banshee", "Dente de Nashor (em vez de Limite da Razão)"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Jogue agressivamente.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Smolder",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Campeão novo = piada nova.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Swain",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Jogue agressivamente.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Sylas",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Véu da Banshee", "Dente de Nashor (em vez de Limite da Razão)"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Jogue agressivamente.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Tahm Kench",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Malignância", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Condicionamento", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembranças do Lorde Dominik", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Talon",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Couraça da Força da Natureza (componente Chain Vest)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Couraça do Defunto"],
      "experiences": "Cuidado com o all-in dele nos níveis 2-3 e 6. E com os saltos sobre paredes.",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Taric",
      "ap_runes": "Não disponível",
      "ap_ss": "Não disponível",
      "ap_items": "Não disponível",
      "on_hit_runes": "Não disponível",
      "on_hit_ss": "Não disponível",
      "on_hit_items": "Não disponível",
      "experiences": "Não disponível",
      "difficulty": "Não disponível"
    },
    {
      "champion": "Teemo",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Véu da Banshee"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Destrua.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Trundle",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya", "Chama Sombria ou Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Tryndamere",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Twisted Fate",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Passos de Mercúrio", "Dente de Nashor", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Bandana de Mercúrio (componente)", "Cajado do Vazio", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Passos de Mercúrio", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Bandana de Mercúrio"],
      "experiences": "Jogue Agressivamente durante toda a fase de rotas.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Udyr",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Malignância", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Urgot",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya", "Chama Sombria"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Vayne",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Couraça do Defunto"],
      "experiences": "Jogue Agressivamente ao Máximo.",
      "difficulty": "2/10 Easy"
    },
    {
      "champion": "Viego",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Viktor",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas da Rapidez", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Véu da Banshee", "Dente de Nashor (em vez de Limite da Razão)"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Jogue Agressivamente ao Máximo.",
      "difficulty": "4/10 Okay"
    },
    {
      "champion": "Vladimir",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Grevas do Berserker", "Limite da Razão (Evoluído)", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Grevas do Berserker", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Jogue Agressivamente ao Máximo.",
      "difficulty": "5/10 Okay"
    },
    {
      "champion": "Volibear",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Botas + 4 Poções", "Botas da Rapidez", "Anel de Doran", "Dente de Nashor", "Tormento de Liandry", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya", "Chama Sombria ou Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Chamado do Carrasco (componente)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Lembrete Mortal", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Corta-cura, Kite!",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Warwick",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Bandana de Mercúrio", "Orbe do Oblívio (componente)", "Botas da Rapidez", "Dente de Nashor", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Terminus", "Jak'Sho, O Proteico", "Limite da Razão"],
      "experiences": "Pegue QSS (Bandana de Mercúrio) e Corta-cura.",
      "difficulty": "3/10 Easy"
    },
    {
      "champion": "Wukong",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Presença de Espírito", "Lenda: Espontaneidade", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Couraça da Força da Natureza (componente Chain Vest)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Armadura de Warmog"],
      "experiences": "Cuidado com o Nível 6",
      "difficulty": "6/10 Okay"
    },
    {
      "champion": "Yasuo",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Couraça da Força da Natureza (componente Chain Vest)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Armadura de Warmog"],
      "experiences": "Engane-o para usar a Parede de Vento.",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Yone",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Couraça da Força da Natureza (componente Chain Vest)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Armadura de Warmog"],
      "experiences": "Cuidado com o Nível 6",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Yorick",
      "ap_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Fantasma", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções ou Botas + 4 Poções", "Botas da Rapidez", "Orbe do Oblívio (componente)", "Dente de Nashor", "Tormento de Liandry", "Capuz da Morte de Rabadon", "Cajado do Vazio", "Ampulheta de Zhonya", "Morellonomicon"],
      "on_hit_runes": {
        "primary_tree": "Feitiçaria",
        "keystone": "Ímpeto Gradual",
        "primary_runes": ["Manto de Nimbus", "Celeridade", "Tempestade Crescente"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Ventos Revigorantes", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Velocidade de Movimento", "Resistência Mágica"]
      },
      "on_hit_ss": ["Fantasma", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas da Rapidez", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Lembrete Mortal", "Limite da Razão"],
      "experiences": "Kite!",
      "difficulty": "8/10 Hard"
    },
    {
      "champion": "Zed",
      "ap_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque ou Agilidade nos Pés",
        "primary_runes": ["Triunfo", "Lenda: Espontaneidade", "Dilacerar"],
        "secondary_tree": "Determinação ou Dominação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo", "ou", "Gosto de Sangue", "Caça Suprema"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Tenacidade e Resistência a Lentidão"]
      },
      "ap_ss": ["Incendiar", "Flash"],
      "ap_items": ["Anel de Doran + 2 Poções", "Botas Revestidas de Aço", "Dente de Nashor", "Tormento de Liandry", "Malignância", "Cajado do Vazio", "Capuz da Morte de Rabadon", "Ampulheta de Zhonya"],
      "on_hit_runes": {
        "primary_tree": "Precisão",
        "keystone": "Pressione o Ataque",
        "primary_runes": ["Cura Excessiva", "Lenda: Linhagem", "Até a Morte"],
        "secondary_tree": "Determinação",
        "secondary_runes": ["Osso Revestido", "Crescimento Excessivo"],
        "shards": ["Velocidade de Ataque", "Força Adaptativa", "Vida (Escalonável)"]
      },
      "on_hit_ss": ["Incendiar", "Flash"],
      "on_hit_items": ["Anel de Doran", "Botas Revestidas de Aço", "Couraça da Força da Natureza (componente Chain Vest)", "Espada do Rei Destruído", "Lâmina da Fúria de Guinsoo", "Mata-Cráquens", "Jak'Sho, O Proteico", "Terminus", "Armadura de Warmog"],
      "experiences": "Cuidado com o Nível 6",
      "difficulty": "7/10 Hard"
    }
  ]
}`;

export const alternativeRunesMap = new Map<string, AlternativeMatchupData>();

try {
  const parsedData: AlternativeRunesRoot = JSON.parse(rawAlternativeJsonData);
  if (parsedData && parsedData.matchups) {
    parsedData.matchups.forEach(matchup => {
      if (matchup && typeof matchup.champion === 'string') {
        alternativeRunesMap.set(normalizeChampionNameForMapKey(matchup.champion), matchup);
      } else {
        console.warn("Skipping invalid alternative matchup object during map creation:", matchup);
      }
    });
  } else {
    console.error("Parsed data or matchups array is missing in alternativeRunes.ts");
  }
} catch (error) {
  console.error("Error parsing alternative runes data:", error);
}
