
import React, { useState, useEffect, useCallback } from 'react';
import { Champion, ChampionMatchupJSONData, AlternativeMatchupData, TeemoRuneGuideData, TeemoItemGuideData, AllRunesRoot, AllRunesData, ItemExplanationData, ItemExplanationCategories } from './types';
import { DEFAULT_LANGUAGE, normalizeChampionNameForMapKey } from './constants';
import { fetchLatestVersion, fetchChampionsData } from './services/lolService';
import Header from './components/Header';
import ChampionCard from './components/ChampionCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import ChampionModal from './components/ChampionModal';
import TeemoRuneGuideSection from './components/TeemoRuneGuideSection';
import TeemoItemGuideSection from './components/TeemoItemGuideSection'; 
import TeemoItemExplanationSection from './components/TeemoItemExplanationSection';
import AllRunesGuideSection from './components/AllRunesGuideSection';
import { championMatchupsMap } from './data/championMatchups';
import { alternativeRunesMap } from './data/alternativeRunes';

type MainTab = 'campeoes' | 'runas' | 'itens'; 

const allRunesJsonString = `{
  "all_runes": {
    "sorcery": {
      "name": "Feitiçaria",
      "keystones": [
        {
          "name": "Cometa Arcano",
          "icon": "https://www.mobafire.com/images/reforged-rune/arcane-comet.png",
          "status": "recommended",
          "description": "Cometa Arcano é uma runa de nicho, mas poderosa. É exclusiva para o dano dos cogumelos, o que significa que você abrirá mão da capacidade de caitar e sobreviver por conta própria pela habilidade de derreter alvos de uma distância segura através dos cogumelos. Diferente de outras runas como Colheita Sombria, ela não exige um pré-requisito para causar dano. Para causar muito dano regularmente, você só precisa de uma build completa focada em cogumelos, então agilize a compra de Tormento de Liandry. Dito isso, ela só seria viável como suporte, enquanto foca em ajudar seu time com jogadas de objetivo."
        },
        {
          "name": "Invocar Aery",
          "icon": "https://www.mobafire.com/images/reforged-rune/summon-aery.png",
          "status": "recommended",
          "description": "Invocar Aery é uma runa ofensiva com a qual você pode pokear seu oponente incansavelmente enquanto também foca no farm. Tiro Tóxico complementa muito bem esta runa. Muitos sites dirão que esta é a melhor runa. Isso não é verdade, é apenas a runa introdutória para todos os jogadores novos e que estão retornando. Na verdade, ela é bem fraca em comparação com todas as outras runas hoje em dia."
        },
        {
          "name": "Ímpeto Gradual",
          "icon": "https://www.mobafire.com/images/reforged-rune/phase-rush.png",
          "status": "recommended",
          "description": "Ímpeto Gradual é uma runa que tem apenas um uso real: mobilidade. Seu principal uso é simplesmente para escapar de lentidão. Uma vez que somos despojados da nossa única salvaguarda, somos facilmente perseguidos e abatidos. Ela nos concede 75% de resistência a lentidão junto com um grande bônus de velocidade de movimento, não de dano. Eu não a recomendaria contra ninguém além de Tahm Kench."
        }
      ],
      "row_one": [
        {
          "name": "Axiom Arcanist (runa removida, texto antigo)",
          "icon": "https://www.mobafire.com/images/reforged-rune/axiom-arcanist.png",
          "status": "recommended",
          "description": "Axiom Arcanist é uma runa perfeita para aqueles que realmente só estão interessados em causar muito dano com a Armadilha Venenosa, sem se preocupar com um Tempo de Recarga um pouco menor, já que você não conseguiria usar essa runa sem ter problemas de sustain de mana sem Faixa de Fluxo de Mana ou Presença de Espírito. Portanto, ela combina muito bem com Dilacerar, pois a combinação aumenta o dano do seu cogumelo em 17.7%."
        },
        {
          "name": "Faixa de Fluxo de Mana",
          "icon": "https://www.mobafire.com/images/reforged-rune/manaflow-band.png",
          "status": "recommended",
          "description": "Faixa de Fluxo de Mana é uma runa incrível para nós, agora que não precisamos mais spammar o Dardo Ofuscante para obter um acúmulo para a regeneração de mana no final do jogo. Presença de Espírito é uma runa muito superior, pois concede mana por todo o dano causado, incluindo veneno."
        },
        {
          "name": "Manto de Nimbus",
          "icon": "https://i.gyazo.com/2c262fd4be69925208ebdbf62d1abd48.png",
          "status": "not_recommended",
          "description": "Manto de Nimbus é inútil. Muitas pessoas parecem gostar de usá-la no Teemo pela mobilidade adicional que aplica após usar um feitiço de invocador. Isso é ótimo e tudo, mas você está desperdiçando muito potencial devido ao seu alto tempo de recarga e à severa falta de mana se optar por usá-la em vez de uma runa como Faixa de Fluxo de Mana."
        }
      ],
      "row_two": [
        {
          "name": "Transcendência",
          "icon": "https://www.mobafire.com/images/reforged-rune/transcendence.png",
          "status": "recommended",
          "description": "Transcendência é uma runa incrível para aceleração de habilidade e redução de tempo de recarga ao abater um inimigo para suas habilidades não-ultimate. Se você joga como suporte ou com builds orientadas para Colheita Sombria, ela acelera nossa capacidade de usar o (Q)."
        },
        {
          "name": "Celeridade",
          "icon": "https://www.mobafire.com/images/reforged-rune/celerity.png",
          "status": "recommended",
          "description": "Celeridade é uma runa excelente para aumentar a velocidade de movimento geral do Teemo. Mais notavelmente ao jogar com o Esmigalhas, mas também é útil na fase de rotas contra campeões como Darius, Sett ou Garen, embora raramente seja necessária a longo prazo."
        },
        {
          "name": "Foco Absoluto",
          "icon": "https://www.mobafire.com/images/reforged-rune/absolute-focus.png",
          "status": "recommended",
          "description": "Foco Absoluto é uma ótima runa para aumentar seu dano geral durante o início do jogo, desde que você mantenha sua vida acima de 70%. Isso pode realmente ajudar na sua capacidade de dar o último golpe nos minions e simplesmente causar muito mais dano ao campeão inimigo que não consegue pokear com força. É horrível contra poke pesado."
        }
      ],
      "row_three": [
        {
          "name": "Chamuscar",
          "icon": "https://www.mobafire.com/images/reforged-rune/scorch.png",
          "status": "recommended",
          "description": "Chamuscar é incrível e totalmente focado no início do jogo. Do minuto 1 ao 19 é onde você obtém o benefício total. Quando você chega ao minuto 20 em diante, o uso desta runa é menos eficaz do que Tempestade Crescente. Se você tiver problemas para manter os inimigos com pouca vida, especialmente ao acumular Colheita Sombria, é uma escolha incrível para ajudar a criar um efeito bola de neve no início."
        },
        {
          "name": "Caminhar Sobre as Águas",
          "icon": "https://www.mobafire.com/images/reforged-rune/waterwalking.png",
          "status": "recommended",
          "description": "Caminhar Sobre as Águas é o tipo de runa que você só deve usar se estiver jogando de Teemo na selva e quiser priorizar o controle do Aronguejo, bem como os objetivos do Dragão e Arauto, porque aumenta seu dano geral enquanto está no rio, além de melhorar sua mobilidade."
        },
        {
          "name": "Tempestade Crescente",
          "icon": "https://www.mobafire.com/images/reforged-rune/gathering-storm.png",
          "status": "recommended",
          "description": "Tempestade Crescente, ao contrário de Chamuscar, é uma runa incrível para o final do jogo. Se você joga constantemente partidas que duram 30-40-50-60 minutos, você vai tirar o máximo proveito de seus jogos usando esta runa e maximizando seu AP. Mas nos primeiros 1-9 minutos, você não ganha nada para te ajudar na rota."
        }
      ]
    },
    "domination": {
      "name": "Dominação",
      "keystones": [
        {
          "name": "Eletrocutar",
          "icon": "https://www.mobafire.com/images/reforged-rune/electrocute.png",
          "status": "recommended",
          "description": "Eletrocutar é uma das runas mais fortes devido ao seu baixo tempo de recarga e sinergia com Tiro Tóxico. Esta runa é estritamente para burst. A duração do veneno estenderá a duração em que você está em combate com o inimigo, contando como 1/3 dos ataques necessários para ativar Eletrocutar, permitindo finalizá-los com um combo rápido."
        },
        {
          "name": "Colheita Sombria",
          "icon": "https://www.mobafire.com/images/reforged-rune/dark-harvest.png",
          "status": "recommended",
          "description": "Colheita Sombria é estritamente uma runa de acúmulo de almas que exige que você consistentemente baixe a vida do seu oponente para 50%. Seu objetivo não é necessariamente matá-los no início, pois seu potencial de abate é no meio e final do jogo. É uma runa de aposta, pois você precisa ter certeza de que pode lidar com seu oponente na rota para focar em acumular almas."
        },
        {
          "name": "Chuva de Lâminas",
          "icon": "https://www.mobafire.com/images/reforged-rune/hail-of-blades.png",
          "status": "recommended",
          "description": "Chuva de Lâminas é uma runa para trocas rápidas. É principalmente útil contra campeões que se beneficiam de trocas muito curtas. As recentes mudanças na runa e como ela se comporta com nosso Tiro Tóxico a tornam ideal para jogadores que têm dificuldades com esses tipos de trocas rápidas com aproximação. Ela perde força no final do jogo."
        }
      ],
      "row_one": [
        {
          "name": "Golpe Desleal",
          "icon": "https://www.mobafire.com/images/reforged-rune/cheap-shot.png",
          "status": "recommended",
          "description": "Golpe Desleal se resume a causar dano verdadeiro extra. É a runa ideal para causar dano. Você pode ativá-la automaticamente com Armadilha Venenosa e com Dardo Ofuscante, desde que você os tenha envenenado antes."
        },
        {
          "name": "Gosto de Sangue",
          "icon": "https://www.mobafire.com/images/reforged-rune/taste-of-blood.png",
          "status": "recommended",
          "description": "Gosto de Sangue serve para te dar um pouco de sustain, especialmente em confrontos de poke intenso como contra Malphite ou Gangplank. Tem um tempo de recarga de 20 segundos, mas pode ser incrivelmente útil para te manter saudável."
        },
        {
          "name": "Impacto Repentino",
          "icon": "https://i.gyazo.com/9d9c1650b172fd63f826e4d544ef20b0.png",
          "status": "not_recommended",
          "description": "Impacto Repentino parece incrível, 6 de penetração mágica ao sair da furtividade. Em teoria, é uma runa fantástica, mas é superada por runas de dano não mitigado como Golpe Desleal, que causa uma boa quantidade de dano verdadeiro."
        }
      ],
      "row_two": [
        {
          "name": "Sentinela Profunda",
          "icon": "https://www.mobafire.com/images/reforged-rune/deep-ward.png",
          "status": "recommended",
          "description": "Sentinelas Profundas são para aqueles que amam adentrar a selva inimiga. Ter alguns segundos extras é absolutamente crucial e torna mais difícil para eles derrubarem as sentinelas com +1 de vida, dando muito mais controle de visão. Discutível se seria útil para jogadores de rota."
        }
      ],
      "row_three": [
        {
          "name": "Caçador de Tesouros",
          "icon": "https://www.mobafire.com/images/reforged-rune/treasure-hunter.png",
          "status": "recommended",
          "description": "Caçador de Tesouros tem sido uma runa controversa, mas com a perda de Caça Ardilosa, seu uso melhorou ligeiramente, especialmente se você está jogando um estilo mais bola de neve, valorizando o ouro para fechar jogos mais cedo."
        },
        {
          "name": "Caça Suprema",
          "icon": "https://www.mobafire.com/images/reforged-rune/ultimate-hunter.png",
          "status": "recommended",
          "description": "Caça Suprema não é tão forte quanto costumava ser. Se você não planeja comprar itens que ofereçam aceleração de habilidade, ela é muito mais eficaz do que se o fizesse, dando-lhe mais do que apenas (1) segundo de redução de recarga no seu (R)."
        },
        {
          "name": "Caça Incansável",
          "icon": "https://i.gyazo.com/99b1b0387e13720a73e8a171022620f7.png",
          "status": "not_recommended",
          "description": "O veneno tanto do Tiro Tóxico quanto das Armadilhas Venenosas nos manterá em combate do outro lado do mapa, negando completamente esta runa e tornando-a menos eficaz do que parece."
        }
      ]
    },
    "precision": {
      "name": "Precisão",
      "keystones": [
        {
          "name": "Pressione o Ataque",
          "icon": "https://www.mobafire.com/images/reforged-rune/press-the-attack.png",
          "status": "recommended",
          "description": "Pressione o Ataque é a melhor runa, ponto final, para counterar tanques e lutadores da rota superior. O maior benefício desta runa é a capacidade de maximizar livremente sua Mover Rápido. É uma runa usada em nossa principal build de split-push. Não será boa contra campeões que você não consegue caitar."
        },
        {
          "name": "Agilidade nos Pés",
          "icon": "https://www.mobafire.com/images/reforged-rune/fleet-footwork.png",
          "status": "recommended",
          "description": "Agilidade nos Pés concede velocidade de movimento adicional enquanto nos cura. A sustentação é definitivamente mais forte que a de Aperto dos Mortos-Vivos, a única diferença é que você causa muito mais dano com praticamente todas as outras runas. Você pode se sustentar em Torres, Selva, Campeões e até minions de campeões como Heimerdinger."
        },
        {
          "name": "Conquistador",
          "icon": "https://i.gyazo.com/1bd937b517e63a71d5151d4ae86f0c00.png",
          "status": "not_recommended",
          "description": "Conquistador é a única runa que se parece com o antigo Fervor da Batalha. Infelizmente, não conseguimos acumular esta runa de forma eficaz, devido à sua baixa duração e por não interagir com o nosso dano ao longo do tempo do Tiro Tóxico."
        }
      ],
      "row_one": [
        {
          "name": "Triunfo",
          "icon": "https://www.mobafire.com/images/reforged-rune/triumph.png",
          "status": "recommended",
          "description": "Triunfo é uma runa de sustain. É melhor utilizada ao mergulhar sob a torre ou ao conseguir um abate, restaurando sua vida em 12% da sua vida máxima. Contanto que consiga uma assistência, você receberá a cura."
        },
        {
          "name": "Presença de Espírito",
          "icon": "https://www.mobafire.com/images/reforged-rune/presence-of-mind.png",
          "status": "recommended",
          "description": "Presença de Espírito é uma ótima runa que complementa Colheita Sombria ou builds com alto consumo de mana. Ela concede 15% de mana por abate/assistência e regeneração de mana ao causar dano. É impossível gerenciar cogumelos com 7 segundos ou menos de recarga sem uma grande reserva de mana para suportar."
        }
      ],
      "row_two": [
        {
          "name": "Lenda: Espontaneidade",
          "icon": "https://www.mobafire.com/images/reforged-rune/legend-alacrity.png",
          "status": "recommended",
          "description": "Lenda: Espontaneidade é a única runa nesta seção que você se daria ao trabalho de pegar. Teemo tem uma velocidade de ataque relativamente baixa, e esta runa, juntamente com itens como Dente de Nashor, tornará o caiting e o farm uma interação muito mais suave."
        },
        {
          "name": "Lenda: Aceleração",
          "icon": "https://www.mobafire.com/images/reforged-rune/legend-haste.png",
          "status": "recommended",
          "description": "Lenda: Aceleração é o que recebemos em substituição a Lenda: Tenacidade. Isso é útil para estilos de jogo com cogumelos, se você prefere a redução extra de 0,20 segundos no seu Ultimate em vez de velocidade de ataque. É uma questão de preferência pessoal."
        },
        {
          "name": "Lenda: Linhagem",
          "icon": "https://i.gyazo.com/1bd937b517e63a71d5151d4ae86f0c00.png",
          "status": "not_recommended",
          "description": "Lenda: Linhagem não é necessária. Embora não tenhamos sustain em nossa build, não vale a pena construir para uma runa como esta. Perdemos uma velocidade de ataque severa sem a Lenda: Espontaneidade, o que é crucial."
        }
      ],
      "row_three": [
        {
          "name": "Golpe de Misericórdia",
          "icon": "https://www.mobafire.com/images/reforged-rune/coup-de-grace.png",
          "status": "recommended",
          "description": "Golpe de Misericórdia é uma ótima runa, normalmente somos capazes de manter os inimigos da rota abaixo de 40% de vida devido ao nosso veneno e poke no início do jogo. Não é muito eficaz contra campeões com muito sustain, a menos que você consiga pokear através da sustentação deles com o Orbe do Oblívio."
        },
        {
          "name": "Dilacerar",
          "icon": "https://www.mobafire.com/images/reforged-rune/cut-down.png",
          "status": "recommended",
          "description": "Dilacerar é uma runa incrível para causar mais dano quando o inimigo cai abaixo de 60% de vida. O dano é muito bom no início do jogo. Você causará um dano extra consistente de 8%. Poucos campeões acumulam vida massiva hoje em dia, então é uma runa bem fácil de abusar."
        },
        {
          "name": "Até a Morte",
          "icon": "https://www.mobafire.com/images/reforged-rune/last-stand.png",
          "status": "recommended",
          "description": "Até a Morte é uma runa que pegamos quando sabemos que ficaremos com pouca vida por períodos prolongados. Você causa 5% a mais de dano abaixo de 60%, e 11% abaixo de 30%, o que pode ser muito bem utilizado para atrair pessoas. Mas é uma preferência pessoal, já que Golpe de Misericórdia é muito mais seguro."
        }
      ]
    },
    "resolve": {
      "name": "Determinação",
      "keystones": [
        {
          "name": "Aperto dos Mortos-Vivos",
          "icon": "https://www.mobafire.com/images/reforged-rune/grasp-of-the-undying.png",
          "status": "recommended",
          "description": "Aperto dos Mortos-Vivos é uma runa defensiva, orientada para o sustain. Esta runa é horrível contra campeões como Ryze ou Cassiopeia, devido ao fato de que o alcance e o dano/atordoamento deles superam sua capacidade de farmar ou pokear com seu Tiro Tóxico de curto alcance. Normalmente é usada contra Fiora, Camille, Riven, Gangplank, Malphite, Wukong, Vladimir e Renekton."
        },
        {
          "name": "Pós-choque",
          "icon": "https://i.gyazo.com/2d546981167aa20e23b6f3ad6362b4ca.png",
          "status": "not_recommended",
          "description": "Pós-choque está desativado para o Teemo, não podemos ativá-lo. Ele o substitui por Aperto dos Mortos-Vivos."
        },
        {
          "name": "Guardião",
          "icon": "https://i.gyazo.com/9f97a382a73c6925e682abd10f1cbd82.png",
          "status": "not_recommended",
          "description": "Embora possa ser usado ao dar suporte a um aliado na rota inferior, ele simplesmente não oferece muita sinergia com o kit ou estilo de jogo dele."
        }
      ],
      "row_one": [
        {
          "name": "Demolir",
          "icon": "https://www.mobafire.com/images/reforged-rune/demolish.png",
          "status": "recommended",
          "description": "Demolir é a única runa aqui que você vai querer pegar, as outras runas simplesmente não têm muita interação com o Teemo. Ela ajuda a levar objetivos e escala bem no final do jogo com o Aperto dos Mortos-Vivos."
        },
        {
          "name": "Fonte de Vida",
          "icon": "https://i.gyazo.com/ef1db950c5a9d6c57e79f8090469f09c.png",
          "status": "not_recommended",
          "description": "Fonte de Vida é uma habilidade de suporte, na maioria dos nossos jogos não estaremos perto de aliados e, mesmo que estejamos, não ganhamos nada com isso, enquanto nossos aliados recebem uma pequena cura."
        },
        {
          "name": "Golpe de Escudo",
          "icon": "https://i.gyazo.com/3c2af3a443ac1ec08351d722f3dd1042.png",
          "status": "not_recommended",
          "description": "Nós não temos escudos, e se pegarmos Barreira, perderemos a maior parte da nossa pressão de abate na rota. Portanto, não nos preocupamos com esta runa."
        }
      ],
      "row_two": [
        {
          "name": "Ventos Revigorantes",
          "icon": "https://www.mobafire.com/images/reforged-rune/second-wind.png",
          "status": "recommended",
          "description": "Ventos Revigorantes é uma runa de sustain incrível para campeões que só te acertam uma vez antes de recuar. Campeões como Camille, Pantheon, Gangplank e Malphite com seu poke e recuo."
        },
        {
          "name": "Osso Revestido",
          "icon": "https://www.mobafire.com/images/reforged-rune/bone-plating.png",
          "status": "recommended",
          "description": "Osso Revestido, ao contrário de Ventos Revigorantes, é uma runa de mitigação incrível para campeões que continuam a te atingir após o primeiro golpe. Ela não mitiga a primeira instância de dano; este primeiro golpe ativará a runa para os próximos 3 golpes."
        },
        {
          "name": "Condicionamento",
          "icon": "https://i.gyazo.com/1f47832c9a735ec937cee724af86783d.png",
          "status": "not_recommended",
          "description": "Condicionamento tem o potencial de ser enorme para você, se o seu jogo se transformar em um jogo com 4 dragões da terra acumulados, mas isso é bastante inconsistente e depende do RNG dos dragões para ser totalmente utilizado, pois tem uma sinergia tremenda com eles."
        }
      ],
      "row_three": [
        {
          "name": "Crescimento Excessivo",
          "icon": "https://www.mobafire.com/images/reforged-rune/overgrowth.png",
          "status": "recommended",
          "description": "Crescimento Excessivo é uma runa decente para o Teemo. 3 de vida e 3,5% de vida máxima podem não parecer muito, mas pode fazer uma grande diferença, quando construído adequadamente com os itens certos."
        },
        {
          "name": "Inabalável",
          "icon": "https://www.mobafire.com/images/reforged-rune/unflinching.png",
          "status": "recommended",
          "description": "Inabalável é obrigatório ao enfrentar Nasus por causa de sua habilidade Murchar, que desabilita nossa capacidade de caitar efetivamente. Esta se tornou uma runa mais importante devido aos contínuos nerfs no Ímpeto Gradual."
        },
        {
          "name": "Revitalizar",
          "icon": "https://i.gyazo.com/351b3d5efea8bf626dd58d075c8c7db9.png",
          "status": "not_recommended",
          "description": "Revitalizar não é utilizável no Teemo, a menos que queiramos mais sustain dos acúmulos de Aperto dos Mortos-Vivos em 10%, mas isso é desnecessário, já que não podemos utilizar seu poder de escudo aumentado junto com o sustain."
        }
      ]
    },
    "inspiration": {
      "name": "Inspiração",
      "keystones": [
        {
          "name": "Aprimoramento Glacial / Primeiro Ataque",
          "icon": "https://www.mobafire.com/images/reforged-rune/glacial-augment.png",
          "status": "not_recommended",
          "description": "Aprimoramento Glacial não funcionará mais com Teemo. Ele foi alterado para agir como o Pós-choque. A runa será substituída por Primeiro Ataque, que é uma runa terrível. É uma boa runa para campeões como Karthus. Nós não podemos fazer isso; o dano extra de 10% é contornado ao pegar uma árvore de runas adequada que lhe dá mais dano."
        },
        {
          "name": "Livro de Feitiços Deslacrado",
          "icon": "https://i.gyazo.com/840de69621c6e564dc7b05d8c435f399.png",
          "status": "not_recommended",
          "description": "Livro de Feitiços Deslacrado tem muito pouca interação com o Teemo. Ao perder uma seção inteira de runas que pode ajudá-lo na rota/final do jogo, seria um grande desperdício, já que tudo o que você ganha são feitiços, não runas."
        }
      ],
      "row_one": [
        {
          "name": "Calçados Mágicos",
          "icon": "https://www.mobafire.com/images/reforged-rune/magical-footwear.png",
          "status": "recommended",
          "description": "Calçados Mágicos é uma runa com a qual eu pessoalmente não concordo, já que você realmente quer ter suas botas no primeiro retorno à base. Se você consegue sobreviver sem elas, a escolha é sua. Realisticamente, a única função que se sai moderadamente bem com esta runa é a de caçador."
        },
        {
          "name": "Flashtração Hextec",
          "icon": "https://i.gyazo.com/1e82e56679d95a3c653c14421d9eba1a.png",
          "status": "not_recommended",
          "description": "Flashtração Hextec foi alterada há algumas temporadas em como interage com campeões invisíveis. Costumávamos ser capazes de canalizar a habilidade enquanto estávamos furtivos, o que proporcionava algumas maneiras muito engraçadas de superar as pessoas enquanto estávamos nos arbustos. Atualmente, é bastante inútil."
        }
      ],
      "row_two": [
        {
          "name": "Entrega de Biscoitos",
          "icon": "https://www.mobafire.com/images/reforged-rune/biscuit-delivery.png",
          "status": "recommended",
          "description": "Entrega de Biscoitos não é mais tão boa, principalmente pelo fato de que escolher esta runa em vez de qualquer outra sub-runa como as de Determinação ou Feitiçaria resulta em menos sobrevivência e dano. Ainda assim, é a única runa que você realmente pegaria aqui."
        }
      ],
      "row_three": [
        {
          "name": "Tônico de Distorção no Tempo",
          "icon": "https://i.imgur.com/74gA3Ut.png",
          "status": "not_recommended",
          "description": "Tônico de Distorção no Tempo é inútil, contanto que você esteja jogando bem e se posicionando corretamente para evitar o engajamento do campeão, além de utilizar seu (Q) para mitigar o dano. Você não deveria ter que depender do sustain de algo assim."
        },
        {
          "name": "Perspicácia Cósmica",
          "icon": "https://i.imgur.com/5BpOH0k.png",
          "status": "not_recommended",
          "description": "Perspicácia Cósmica é principalmente para campeões que querem se locomover mais rápido com o Teleporte ou para pessoas que usam o Livro de Feitiços Deslacrado, que nunca pegamos. Não precisamos de aceleração de item ou de feitiço de invocador."
        },
        {
          "name": "Velocidade de Aproximação",
          "icon": "https://i.imgur.com/ngySEOU.png",
          "status": "not_recommended",
          "description": "Velocidade de Aproximação era uma ótima runa quando combinada com Aprimoramento Glacial. Agora, só desaceleramos com o (R), o que significaria abrir mão de muito dano para justificar esta árvore como uma opção secundária ou primária."
        }
      ]
    },
    "rune_shards": {
      "name": "Fragmentos de Runa",
      "description": "Quando se trata de fragmentos de runa, é tudo uma questão de preferência pessoal. Algumas pessoas preferem o padrão de 10% de Velocidade de Ataque / Força Adaptativa / Vida Fixa. Outras preferem Força Adaptativa / Força Adaptativa / Vida com Escalonamento. Outras ainda preferem algo diferente. Isso faz diferença no seu desempenho na fase de rotas. A Força Adaptativa extra pode realmente ajudar no último golpe nos minions e a causar dano. Misture as coisas e experimente algo novo. Algo pode beneficiar o seu estilo.",
      "options_by_row": {
        "row_1_offense": [
          {
            "name": "Velocidade de Ataque",
            "icon": "https://www.mobafire.com/images/shards/attack-speed.png"
          },
          {
            "name": "Força Adaptativa",
            "icon": "https://www.mobafire.com/images/shards/adaptive-force.png"
          },
          {
            "name": "Aceleração de Habilidade",
            "icon": "https://www.mobafire.com/images/shards/ability-haste.png"
          }
        ],
        "row_2_flex": [
          {
            "name": "Força Adaptativa",
            "icon": "https://www.mobafire.com/images/shards/adaptive-force.png"
          },
          {
            "name": "Velocidade de Movimento",
            "icon": "https://www.mobafire.com/images/shards/movement-speed.png"
          },
          {
            "name": "Tenacidade e Resistência a Lentidão",
            "icon": "https://www.mobafire.com/images/shards/tenacity-and-slow-resist.png"
          }
        ],
        "row_3_defense": [
          {
            "name": "Vida (Escalonamento)",
            "icon": "https://www.mobafire.com/images/shards/health-scaling.png"
          },
          {
            "name": "Tenacidade e Resistência a Lentidão",
            "icon": "https://www.mobafire.com/images/shards/tenacity-and-slow-resist.png"
          },
          {
            "name": "Vida (Fixa)",
            "icon": "https://www.mobafire.com/images/shards/flat-health.png"
          }
        ]
      }
    }
  }
}`;

let parsedAllRunesData: AllRunesData | null = null;
let parsingErrorAllRunes: string | null = null;
try {
  const parsedJsonRoot: AllRunesRoot = JSON.parse(allRunesJsonString);
  if (parsedJsonRoot && parsedJsonRoot.all_runes) {
    parsedAllRunesData = parsedJsonRoot.all_runes;
  } else {
    parsingErrorAllRunes = "Estrutura do JSON de todas as runas é inválida ou não contém 'all_runes'.";
    console.error(parsingErrorAllRunes);
  }
} catch (e) {
  console.error("Failed to parse all runes JSON:", e);
  parsingErrorAllRunes = e instanceof Error ? `Erro ao processar dados das runas: ${e.message}` : "Erro desconhecido ao processar dados das runas.";
}

const teemoRuneGuideJsonString = `{
  "guiaDeRunasTeemo": {
    "autor": "Sovereign Kitten",
    "descricaoGeral": "Um extrato completo e fiel de todas as páginas de runas recomendadas no guia, com os nomes traduzidos para o português oficial do jogo. As runas devem ser adaptadas ao seu estilo de jogo, à sua lane e aos campeões inimigos.",
    "rotas": [
      {
        "nomeRota": "TOP",
        "paginasDeRunas": [
          {
            "nomePagina": "PRESSIONE O ATAQUE",
            "dicaDoAutor": "Pessoalmente, você não deveria ficar spamando seu (Q), você vai maximizar o (W) e (E) e focar na sua mobilidade e kiting. Se você sentir que precisa de mana, pegue Presença de Espírito ou Faixa de Fluxo de Mana. Mas você realmente não precisa deles porque você é um campeão que depende principalmente de ataques básicos com alguns itens on-hit e um build híbrido AP/AD.",
            "caminhoPrimario": {
              "nome": "Precisão",
              "runaPrincipal": { "nome": "Pressione o Ataque", "icone": "/images/reforged-rune/press-the-attack.png" },
              "runas": [
                { "nome": "Triunfo", "icone": "/images/reforged-rune/triumph.png" },
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" },
                { "nome": "Golpe de Misericórdia", "icone": "/images/reforged-rune/coup-de-grace.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Feitiçaria",
              "runas": [
                { "nome": "Celeridade", "icone": "/images/reforged-rune/celerity.png" },
                { "nome": "Tempestade Crescente", "icone": "/images/reforged-rune/gathering-storm.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+65 de Vida Base"]
          },
          {
            "nomePagina": "COLHEITA SOMBRIA",
            "dicaDoAutor": "Colheita Sombria é uma runa de burst de alto tempo de recarga para o final do jogo, que EXIGE que você consiga acumular almas de forma consistente. Se não conseguir, é uma runa inútil, pois você precisa de mais de 25 acúmulos para superar Eletrocutar no final do jogo. Caçador de Tesouros ou Caça Suprema são as únicas runas de takedown que valem a pena.",
            "caminhoPrimario": {
              "nome": "Dominação",
              "runaPrincipal": { "nome": "Colheita Sombria", "icone": "/images/reforged-rune/dark-harvest.png" },
              "runas": [
                { "nome": "Golpe Desleal", "icone": "/images/reforged-rune/cheap-shot.png" },
                { "nome": "Sentinela Zumbi", "icone": "/images/reforged-rune/deep-ward.png" },
                { "nome": "Caça Suprema", "icone": "/images/reforged-rune/ultimate-hunter.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Dilacerar", "icone": "/images/reforged-rune/cut-down.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+10-180 de Vida adicional (escalável)"]
          },
          {
            "nomePagina": "INVOCAR AERY",
            "dicaDoAutor": "Esta é a build padrão para iniciantes. Tem o maior dano consistente na fase de rotas, mas decai muito no final do jogo. Recomendo Presença de Espírito e Faixa de Fluxo de Mana juntos para sustain de mana infinito.",
            "caminhoPrimario": {
              "nome": "Feitiçaria",
              "runaPrincipal": { "nome": "Invocar Aery", "icone": "/images/reforged-rune/summon-aery.png" },
              "runas": [
                { "nome": "Faixa de Fluxo de Mana", "icone": "/images/reforged-rune/manaflow-band.png" },
                { "nome": "Foco Absoluto", "icone": "/images/reforged-rune/absolute-focus.png" },
                { "nome": "Chamuscar", "icone": "/images/reforged-rune/scorch.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Golpe de Misericórdia", "icone": "/images/reforged-rune/coup-de-grace.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+10-180 de Vida adicional (escalável)"]
          },
          {
            "nomePagina": "AGILIDADE NOS PÉS",
            "dicaDoAutor": "Eu só recomendaria isso em matchups realmente difíceis onde você levará muito dano (Malphite, Olaf, Aatrox). Você não causa muito dano com esta runa, dependendo totalmente da build de itens, mas a sustentação é forte.",
            "caminhoPrimario": {
              "nome": "Precisão",
              "runaPrincipal": { "nome": "Agilidade nos Pés", "icone": "/images/reforged-rune/fleet-footwork.png" },
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" },
                { "nome": "Dilacerar", "icone": "/images/reforged-rune/cut-down.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Determinação",
              "runas": [
                { "nome": "Ventos Revigorantes", "icone": "/images/reforged-rune/second-wind.png" },
                { "nome": "Crescimento Excessivo", "icone": "/images/reforged-rune/overgrowth.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+10% de Tenacidade e Resistência a Lentidão"]
          },
          {
            "nomePagina": "ELETROCUTAR",
            "dicaDoAutor": "Eletrocutar é uma runa de burst de baixo tempo de recarga, permitindo trocas rápidas e dano alto. Em comparação com o quão forte Colheita Sombria se tornou, esta runa não tem sido muito usada, pois é mais focada em fechar o jogo cedo e criar snowball.",
            "caminhoPrimario": {
              "nome": "Dominação",
              "runaPrincipal": { "nome": "Eletrocutar", "icone": "/images/reforged-rune/electrocute.png" },
              "runas": [
                { "nome": "Golpe Desleal", "icone": "/images/reforged-rune/cheap-shot.png" },
                { "nome": "Sentinela Zumbi", "icone": "/images/reforged-rune/deep-ward.png" },
                { "nome": "Caça Suprema", "icone": "/images/reforged-rune/ultimate-hunter.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+10-180 de Vida adicional (escalável)"]
          },
          {
            "nomePagina": "APERTO DOS MORTOS-VIVOS",
            "dicaDoAutor": "Aperto é estritamente para sobreviver a rotas de poke pesado e com muito gap close, para ser mais tanque. Seu late game sofre devido ao baixo dano. É mais um build 'meme' para um Teemo tanque.",
            "caminhoPrimario": {
              "nome": "Determinação",
              "runaPrincipal": { "nome": "Aperto dos Mortos-Vivos", "icone": "/images/reforged-rune/grasp-of-the-undying.png" },
              "runas": [
                { "nome": "Demolir", "icone": "/images/reforged-rune/demolish.png" },
                { "nome": "Ventos Revigorantes", "icone": "/images/reforged-rune/second-wind.png" },
                { "nome": "Crescimento Excessivo", "icone": "/images/reforged-rune/overgrowth.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Até a Morte", "icone": "/images/reforged-rune/last-stand.png" },
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+10-180 de Vida adicional (escalável)", "+10-180 de Vida adicional (escalável)"]
          },
          {
            "nomePagina": "ÍMPETO GRADUAL",
            "dicaDoAutor": "Agilidade nos Pés é basicamente uma combinação desta runa com Aperto. Esta runa não tem muito impacto fora de composições com muito slow. Não espere causar muito dano.",
            "caminhoPrimario": {
              "nome": "Feitiçaria",
              "runaPrincipal": { "nome": "Ímpeto Gradual", "icone": "/images/reforged-rune/phase-rush.png" },
              "runas": [
                { "nome": "Faixa de Fluxo de Mana", "icone": "/images/reforged-rune/manaflow-band.png" },
                { "nome": "Foco Absoluto", "icone": "/images/reforged-rune/absolute-focus.png" },
                { "nome": "Tempestade Crescente", "icone": "/images/reforged-rune/gathering-storm.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" },
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+10-180 de Vida adicional (escalável)", "+10% de Tenacidade e Resistência a Lentidão"]
          },
          {
            "nomePagina": "COMETA (Cogumelos)",
            "dicaDoAutor": "Se você quer usar a nova runa Arcanista do Axioma, não faz muito sentido abrir mão da sustentabilidade de mana no início. Nesse caso, Colheita Sombria pode ser uma escolha melhor, mas quem não quer um aumento de 17.7% no dano do ultimate?",
            "caminhoPrimario": {
              "nome": "Feitiçaria",
              "runaPrincipal": { "nome": "Cometa Arcano", "icone": "/images/reforged-rune/arcane-comet.png" },
              "runas": [
                { "nome": "Arcanista do Axioma", "icone": "/images/reforged-rune/axiom-arcanist.png" },
                { "nome": "Transcendência", "icone": "/images/reforged-rune/transcendence.png" },
                { "nome": "Tempestade Crescente", "icone": "/images/reforged-rune/gathering-storm.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Dilacerar", "icone": "/images/reforged-rune/cut-down.png" }
              ]
            },
            "fragmentos": ["+9 de Força Adaptativa", "+9 de Força Adaptativa", "+65 de Vida Base"]
          }
        ]
      },
      {
        "nomeRota": "JUNGLE",
        "paginasDeRunas": [
          {
            "nomePagina": "PRESSIONE O ATAQUE (Invade)",
            "dicaDoAutor": "Uma runa bem balanceada para duelar contra oponentes e escalar para o final do jogo. É ideal contra caçadores que são mais fracos no início. Não é boa contra composições de CC puro.",
            "caminhoPrimario": {
              "nome": "Precisão",
              "runaPrincipal": { "nome": "Pressione o Ataque", "icone": "/images/reforged-rune/press-the-attack.png" },
              "runas": [
                { "nome": "Triunfo", "icone": "/images/reforged-rune/triumph.png" },
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" },
                { "nome": "Golpe de Misericórdia", "icone": "/images/reforged-rune/coup-de-grace.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Feitiçaria",
              "runas": [
                { "nome": "Celeridade", "icone": "/images/reforged-rune/celerity.png" },
                { "nome": "Caminhar Sobre as Águas", "icone": "/images/reforged-rune/waterwalking.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+65 de Vida Base"]
          },
          {
            "nomePagina": "COLHEITA SOMBRIA (Controle de Mapa)",
            "dicaDoAutor": "Esta build tem drasticamente menos velocidade de movimento, mas foca mais na cobertura do mapa com cogumelos extremamente poderosos. Pode levar tempo para decolar, já que seu início de jogo sofrerá se você for invadido.",
            "caminhoPrimario": {
              "nome": "Dominação",
              "runaPrincipal": { "nome": "Colheita Sombria", "icone": "/images/reforged-rune/dark-harvest.png" },
              "runas": [
                { "nome": "Golpe Desleal", "icone": "/images/reforged-rune/cheap-shot.png" },
                { "nome": "Sentinela Zumbi", "icone": "/images/reforged-rune/deep-ward.png" },
                { "nome": "Caça Suprema", "icone": "/images/reforged-rune/ultimate-hunter.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Feitiçaria",
              "runas": [
                { "nome": "Arcanista do Axioma", "icone": "/images/reforged-rune/axiom-arcanist.png" },
                { "nome": "Transcendência", "icone": "/images/reforged-rune/transcendence.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+65 de Vida Base"]
          }
        ]
      },
      {
        "nomeRota": "MID",
        "paginasDeRunas": [
          {
            "nomePagina": "COLHEITA SOMBRIA",
            "dicaDoAutor": "Ideal para um estilo de jogo de burst no mid. Combina com Determinação na secundária para maior sobrevivência contra magos de poke.",
            "caminhoPrimario": {
              "nome": "Dominação",
              "runaPrincipal": { "nome": "Colheita Sombria", "icone": "/images/reforged-rune/dark-harvest.png" },
              "runas": [
                { "nome": "Gosto de Sangue", "icone": "/images/reforged-rune/taste-of-blood.png" },
                { "nome": "Sentinela Zumbi", "icone": "/images/reforged-rune/deep-ward.png" },
                { "nome": "Caça Suprema", "icone": "/images/reforged-rune/ultimate-hunter.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Determinação",
              "runas": [
                { "nome": "Ventos Revigorantes", "icone": "/images/reforged-rune/second-wind.png" },
                { "nome": "Crescimento Excessivo", "icone": "/images/reforged-rune/overgrowth.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+65 de Vida Base"]
          },
          {
            "nomePagina": "ELETROCUTAR",
            "dicaDoAutor": "Você está jogando no MID, só existe um estilo de jogo: Burst. Se você não acha que precisa da secundária de Determinação, opte por algo com que se sinta confortável (Precisão / Feitiçaria), caso contrário, você ficará sem mana muito rapidamente.",
            "caminhoPrimario": {
              "nome": "Dominação",
              "runaPrincipal": { "nome": "Eletrocutar", "icone": "/images/reforged-rune/electrocute.png" },
              "runas": [
                { "nome": "Gosto de Sangue", "icone": "/images/reforged-rune/taste-of-blood.png" },
                { "nome": "Sentinela Zumbi", "icone": "/images/reforged-rune/deep-ward.png" },
                { "nome": "Caça Suprema", "icone": "/images/reforged-rune/ultimate-hunter.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Determinação",
              "runas": [
                { "nome": "Ventos Revigorantes", "icone": "/images/reforged-rune/second-wind.png" },
                { "nome": "Crescimento Excessivo", "icone": "/images/reforged-rune/overgrowth.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+9 de Força Adaptativa", "+65 de Vida Base"]
          },
          {
            "nomePagina": "PRESSIONE O ATAQUE ou AGILIDADE NOS PÉS",
            "dicaDoAutor": "Se você se encontrar enfrentando magos de poke pesado e não sentir que um estilo de jogo de burst seria adequado para a rota, você pode tentar uma abordagem mais defensiva com Agilidade nos Pés, embora seja uma lane muito mais passiva no geral.",
            "caminhoPrimario": {
              "nome": "Precisão",
              "runaPrincipal": { "nome": "Agilidade nos Pés", "icone": "/images/reforged-rune/fleet-footwork.png" },
              "runas": [
                { "nome": "Triunfo", "icone": "/images/reforged-rune/triumph.png" },
                { "nome": "Lenda: Espontaneidade", "icone": "/images/reforged-rune/legend-alacrity.png" },
                { "nome": "Golpe de Misericórdia", "icone": "/images/reforged-rune/coup-de-grace.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Determinação",
              "runas": [
                { "nome": "Ventos Revigorantes", "icone": "/images/reforged-rune/second-wind.png" },
                { "nome": "Crescimento Excessivo", "icone": "/images/reforged-rune/overgrowth.png" }
              ]
            },
            "fragmentos": ["+10% de Velocidade de Ataque", "+2% de Velocidade de Movimento", "+10% de Tenacidade e Resistência a Lentidão"]
          }
        ]
      },
      {
        "nomeRota": "SUPPORT",
        "paginasDeRunas": [
          {
            "nomePagina": "COMETA ARCANO",
            "dicaDoAutor": "É estranho, mas você usará Teemo como suporte. O melhor uso é com seus cogumelos para cegar alvos. Você buscará o máximo de dano específico com cogumelos, por isso Arcanista do Axioma + Dilacerar se complementam bem. O dano dos cogumelos é significativo no final do jogo, superando Colheita Sombria se você não conseguiu acumular almas.",
            "caminhoPrimario": {
              "nome": "Feitiçaria",
              "runaPrincipal": { "nome": "Cometa Arcano", "icone": "/images/reforged-rune/arcane-comet.png" },
              "runas": [
                { "nome": "Arcanista do Axioma", "icone": "/images/reforged-rune/axiom-arcanist.png" },
                { "nome": "Transcendência", "icone": "/images/reforged-rune/transcendence.png" },
                { "nome": "Tempestade Crescente", "icone": "/images/reforged-rune/gathering-storm.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Dilacerar", "icone": "/images/reforged-rune/cut-down.png" }
              ]
            },
            "fragmentos": ["+9 de Força Adaptativa", "+9 de Força Adaptativa", "+10-180 de Vida adicional (escalável)"]
          },
          {
            "nomePagina": "COLHEITA SOMBRIA",
            "dicaDoAutor": "Idealmente, você procura um acúmulo de Colheita Sombria a cada um ou dois minutos. Se não estiver conseguindo, deveria jogar com outra runa como Cometa para os procs consistentes que ele aplica no meio e final do jogo, enquanto ainda causa muito dano.",
            "caminhoPrimario": {
              "nome": "Dominação",
              "runaPrincipal": { "nome": "Colheita Sombria", "icone": "/images/reforged-rune/dark-harvest.png" },
              "runas": [
                { "nome": "Gosto de Sangue", "icone": "/images/reforged-rune/taste-of-blood.png" },
                { "nome": "Sentinela Zumbi", "icone": "/images/reforged-rune/deep-ward.png" },
                { "nome": "Caça Suprema", "icone": "/images/reforged-rune/ultimate-hunter.png" }
              ]
            },
            "caminhoSecundario": {
              "nome": "Precisão",
              "runas": [
                { "nome": "Presença de Espírito", "icone": "/images/reforged-rune/presence-of-mind.png" },
                { "nome": "Dilacerar", "icone": "/images/reforged-rune/cut-down.png" }
              ]
            },
            "fragmentos": ["+8 de Aceleração de Habilidade", "+9 de Força Adaptativa", "+10-180 de Vida adicional (escalável)"]
          }
        ]
      }
    ]
  }
}`;

let parsedTeemoRuneGuideData: TeemoRuneGuideData | null = null;
let parsingErrorTeemoRuneGuide: string | null = null;
try {
    parsedTeemoRuneGuideData = JSON.parse(teemoRuneGuideJsonString);
} catch (e) {
    console.error("Failed to parse Teemo rune guide JSON:", e);
    parsingErrorTeemoRuneGuide = e instanceof Error ? `Erro ao processar guia de runas do Teemo: ${e.message}` : "Erro desconhecido ao processar guia de runas do Teemo.";
}

const teemoItemGuideJsonString = `{
  "guiaDeItensTeemo": {
    "autor": "Sovereign Kitten",
    "descricaoGeral": "Um extrato completo de todas as builds e itens recomendados no guia para Teemo, incluindo itens iniciais, de meio de jogo, builds completas e situacionais para cada rota, com as dicas estratégicas do autor.",
    "rotas": [
      {
        "nomeRota": "TOP",
        "buildsDeItens": [
          {
            "categoria": "ITENS INICIAIS CORE / DICAS",
            "conjuntos": [
              {
                "nomeConjunto": "Doran's Ring",
                "dicaDoAutor": "O problema com o Anel de Doran antigo era que oferecia pouca sustentação para quem não sabia farmar bem. Agora, basta atacar o campeão inimigo para receber um impulso na regeneração de mana por 10 segundos.",
                "itens": [
                  { "nome": "Anel de Doran", "quantidade": 1 },
                  { "nome": "Poção de Vida", "quantidade": 2 }
                ]
              },
              {
                "nomeConjunto": "Dark Seal",
                "dicaDoAutor": "Se você sabe que vai dominar sua rota, comprar o Selo Negro cedo permite acumular dano de snowball. É recomendado voltar à base e comprar um Selo Negro ou Botas básicas se conseguir abates antes do início da rota.",
                "itens": [
                  { "nome": "Selo Negro", "quantidade": 1 },
                  { "nome": "Poção com Refil", "quantidade": 1 }
                ]
              },
              {
                "nomeConjunto": "Snowball",
                "dicaDoAutor": "Não importa qual runa você use. Se você conseguiu alguns abates cedo, esta é de longe uma das builds mais fortes para snowballar em 1v1, especialmente com Colheita Sombria ou Pressionar o Ataque.",
                "itens": [
                  { "nome": "Dente de Nashor", "quantidade": 1 },
                  { "nome": "Selo Negro", "quantidade": 1 },
                  { "nome": "Chama Sombria", "quantidade": 1 }
                ]
              },
              {
                "nomeConjunto": "Gutted (Destruído)",
                "dicaDoAutor": "Infelizmente, muitos nerfs recentes tornaram um item como a Mata-Cráquens inútil de se construir, não importa a situação. É simplesmente melhor optar por uma variante AP on-hit ou uma build de queima. Teemo AD está oficialmente morto por enquanto.",
                "itens": [
                  { "nome": "Mata-Cráquens", "quantidade": 1 }
                ]
              }
            ]
          },
          {
            "categoria": "PRIMEIRO RETORNO (Idealmente aos 6 Minutos)",
            "conjuntos": [
              {
                "nomeConjunto": "CS / KITE (Nashor)",
                "dicaDoAutor": "No seu primeiro retorno, você deve ter 1100 de ouro ou mais. Idealmente, 1700 de ouro para Botas (Tier 2) e Arco Recurvo. Este retorno é para caitar (kiting), pokear e farmar de forma mais eficaz. Combina bem com runas como Pressione o Ataque.",
                "itens": [
                  { "nome": "Grevas do Berserker", "quantidade": 1 },
                  { "nome": "Arco Recurvo", "quantidade": 1 }
                ]
              },
              {
                "nomeConjunto": "DANO (Liandry's)",
                "dicaDoAutor": "O ideal é ter 1900 de ouro no primeiro retorno. Esta é frequentemente a melhor escolha devido ao custo. Se você tiver first blood, compre as Botas do Feiticeiro. Se não, compre apenas as botas básicas.",
                "itens": [
                  { "nome": "Sapatos do Feiticeiro", "quantidade": 1 },
                  { "nome": "Cinzas Predestinadas", "quantidade": 1 }
                ]
              },
              {
                "nomeConjunto": "Seus primeiros itens baseados na build",
                "dicaDoAutor": "Você deve ter Dente de Nashor ou o Tormento de Liandry e botas por volta dos 13-15 minutos. Se não conseguir, precisa aprender a jogar melhor seus matchups e microgerenciamento.",
                "itens": [
                  { "nome": "Botas", "quantidade": 1 },
                  { "nome": "Dente de Nashor", "quantidade": 1 },
                  { "nome": "Tormento de Liandry", "quantidade": 1 },
                  { "nome": "Sentinela de Controle", "quantidade": 2 }
                ]
              }
            ]
          },
          {
            "categoria": "PRESSIONAR O ATAQUE - Mais eficaz contra composições AP",
            "conjuntos": [
              {
                "nomeConjunto": "BUILD COMPLETA #1 | AP ON-HIT",
                "dicaDoAutor": "Esta é a melhor build que encontrei que acerta em cheio para um estilo de jogo on-hit defensivo, de sustain, baseado em kiting e mobilidade, permitindo que você faça split-push solo e duele contra seus oponentes.",
                "itens": ["Grevas do Berserker", "Dente de Nashor", "Selo Negro", "Chama Sombria", "Tormento de Liandry", "Capuz da Morte de Rabadon"]
              },
              {
                "nomeConjunto": "BUILD COMPLETA #2 | AP BURN",
                "dicaDoAutor": "Se preferir mais dano, pode trocar as Grevas do Berserker por Sapatos do Feiticeiro. No entanto, como não estamos jogando um estilo de kiting com esta build, pode afetar seu desempenho geral, embora aumente seu dano total. É uma build para quando você não pode mais duelar e precisa se juntar ao time.",
                "itens": ["Botas da Rapidez", "Tormento de Liandry", "Malevolência", "Chama Sombria", "Tocha de Fogo Negro", "Capuz da Morte de Rabadon"]
              }
            ]
          },
          {
            "categoria": "COLHEITA SOMBRIA - Mais eficaz contra composições frágeis",
            "conjuntos": [
              {
                "nomeConjunto": "BUILD COMPLETA #1 | BURST (E)!",
                "dicaDoAutor": "Se você quer burst, esta é a build para consistência. Chama Sombria é bom demais para deixar passar com sua penetração mágica pura e escalonamento de AP.",
                "itens": ["Sapatos do Feiticeiro", "Ladrão de Almas de Mejai", "Chama Sombria", "Capuz da Morte de Rabadon", "Perdição de Lich", "Surto da Tempestade"]
              },
              {
                "nomeConjunto": "BUILD COMPLETA #2 | BURST (Q)!",
                "dicaDoAutor": "Embora a passiva de Florescer de Cripta não seja para burst, oferece uma quantidade absurda de penetração mágica e muito dano para uma build de (Q).",
                "itens": ["Sapatos do Feiticeiro", "Ladrão de Almas de Mejai", "Tormento de Liandry", "Chama Sombria", "Surto da Tempestade", "Capuz da Morte de Rabadon"]
              }
            ]
          }
        ]
      },
      {
        "nomeRota": "JUNGLE",
        "buildsDeItens": [
          {
            "categoria": "ITENS INICIAIS CORE / BOTAS",
            "conjuntos": [
              {
                "nomeConjunto": "Escolha um smite",
                "dicaDoAutor": "Preferência pessoal. Se estiver jogando com Pressionar o Ataque, você quer mobilidade e velocidade de clear, então o Andarilho do Vento é ideal. Garra de Brasa é ótimo para acumular mais dano de queimação com Cogumelos e build apropriada.",
                "itens": [
                  { "nome": "Cria de Andarilho do Vento", "quantidade": 1 },
                  { "nome": "Mascote Garra de Brasa", "quantidade": 1 },
                  { "nome": "Poção de Vida", "quantidade": 2 }
                ]
              },
              {
                "nomeConjunto": "Escolha de Botas",
                "dicaDoAutor": "Botas da Rapidez é frequentemente a melhor opção, permitindo que você percorra o mapa de forma muito mais eficaz, especialmente quando combinado com Andarilho do Vento e Celeridade/Caminhar Sobre as Águas.",
                "itens": ["Botas da Rapidez", "Grevas do Berserker", "Sapatos do Feiticeiro", "Botas Ionianas da Lucidez"]
              }
            ]
          },
          {
            "categoria": "PRESSIONAR O ATAQUE (Invade)",
            "conjuntos": [
              {
                "nomeConjunto": "Primeiro Retorno (On-Hit)",
                "dicaDoAutor": "Este é seu retorno ideal, tentando construir Dente de Nashor como seu primeiro item, a menos que você opte por um Mítico AP, o que não é aconselhável, pois você ficará para trás dos caçadores inimigos.",
                "itens": ["Grevas do Berserker", "Arco Recurvo", "Sentinela de Controle", "Lente do Oráculo"]
              },
              {
                "nomeConjunto": "Controle Rotacional",
                "dicaDoAutor": "Você jogará para mobilidade, kiting on-hit e destruição de alvos únicos. Barão/Dragões serão derretidos facilmente. Com Andarilho do Vento, você ganha enormes quantidades de velocidade de clear, dano e movimento pelo mapa.",
                "itens": ["Botas da Rapidez", "Dente de Nashor", "Ladrão de Almas de Mejai", "Chama Sombria", "Tocha de Fogo Negro", "Capuz da Morte de Rabadon"]
              }
            ]
          },
          {
            "categoria": "COLHEITA SOMBRIA (Cogumelos)",
            "conjuntos": [
              {
                "nomeConjunto": "Primeiro Retorno (Burn)",
                "dicaDoAutor": "Este é seu retorno ideal, tentando construir Tormento de Liandry como seu primeiro item para assumir o controle da selva.",
                "itens": ["Botas da Rapidez", "Cinzas Predestinadas", "Sentinela de Controle", "Lente do Oráculo"]
              },
              {
                "nomeConjunto": "Controle de Mapa",
                "dicaDoAutor": "A principal diferença é que você está tentando acumular muito dano de queimação para controle massivo do mapa, espalhando cogumelos por todos os caminhos. Seu dano de alvo único será significativamente menor no início.",
                "itens": ["Botas da Rapidez", "Tormento de Liandry", "Tocha de Fogo Negro", "Chama Sombria", "Malevolência", "Capuz da Morte de Rabadon"]
              }
            ]
          }
        ]
      },
      {
        "nomeRota": "MID",
        "buildsDeItens": [
          {
            "categoria": "ITENS INICIAIS CORE",
            "conjuntos": [
              { "nomeConjunto": "ANEL DE DORAN", "itens": ["Anel de Doran", "Poção de Vida"] },
              { "nomeConjunto": "SELO NEGRO", "itens": ["Selo Negro", "Poção com Refil"] },
              { "nomeConjunto": "CONTRA ZED / TALON", "itens": ["Armadura de Pano", "Poção de Vida"] }
            ]
          },
          {
            "categoria": "OPÇÕES DE PRIMEIRO RETORNO",
            "conjuntos": [
              { "nomeConjunto": "DANO", "itens": ["Cinzas Predestinadas", "Sapatos do Feiticeiro"] },
              { "nomeConjunto": "CS / POKE", "itens": ["Arco Recurvo", "Grevas do Berserker"] },
              { "nomeConjunto": "CONTRA ZED: FAÇA ZHONYA'S RÁPIDO", "itens": ["Proteção de Braço da Caçadora", "Cristal de Rubi"] }
            ]
          },
          {
            "categoria": "COLHEITA SOMBRIA",
            "conjuntos": [
              {
                "nomeConjunto": "GERAL",
                "dicaDoAutor": "Para um estilo de jogo orientado para (R), priorize a capacidade de pokear cedo (Q) e escalar para o dano do (R). Malevolência é um item muito poderoso e provavelmente será nerfado.",
                "itens": ["Sapatos do Feiticeiro", "Tormento de Liandry", "Chama Sombria", "Malevolência", "Tocha de Fogo Negro", "Capuz da Morte de Rabadon"]
              },
              {
                "nomeConjunto": "BURST SNOWBALL",
                "dicaDoAutor": "Esta é a melhor maneira de acumular Colheita Sombria para o seu late game.",
                "itens": ["Sapatos do Feiticeiro", "Ladrão de Almas de Mejai", "Perdição de Lich", "Chama Sombria", "Surto da Tempestade", "Capuz da Morte de Rabadon"]
              }
            ]
          }
        ]
      },
      {
        "nomeRota": "SUPPORT",
        "buildsDeItens": [
          {
            "categoria": "ITENS INICIAIS CORE",
            "conjuntos": [
              {
                "nomeConjunto": "ITEM DE SUPORTE ZAZ'ZAK",
                "dicaDoAutor": "Para ganhar acesso aos cinco itens de suporte primários, você precisará acumular o item até 1000 de ouro. Zaz'Zak's Realmspike é o melhor para Teemo, pois causa dano mágico adicional significativo nos seus cogumelos.",
                "itens": ["Espinho Dimensional de Zaz'Zak", "Poção de Vida"]
              },
              {
                "nomeConjunto": "POR QUE FAZER MALIGNANCE PRIMEIRO?",
                "dicaDoAutor": "Como suporte, a renda é limitada. É mais eficaz obter acesso rápido ao seu (R) e controle de mapa. Malevolência + Tocha de Fogo Negro é mais barato e te coloca no jogo mais rápido do que Liandry.",
                "itens": ["Malevolência"]
              }
            ]
          },
          {
            "categoria": "BUILDS COMPLETAS DE EXEMPLO",
            "conjuntos": [
              {
                "nomeConjunto": "COGUMELOS",
                "dicaDoAutor": "Como a renda de suporte é difícil, Malignance é a melhor escolha inicial. É barato e, quando você o obtém, pode começar a perambular e controlar o mapa, escalando para o final do jogo.",
                "itens": ["Sapatos do Feiticeiro", "Espinho Dimensional de Zaz'Zak", "Malevolência", "Tocha de Fogo Negro", "Chama Sombria", "Capuz da Morte de Rabadon"]
              },
              {
                "nomeConjunto": "SITUACIONAIS",
                "dicaDoAutor": "Anti-cura para jogos de alta sustentação. Você compraria isso no início do jogo se fosse crucial. Cajado do Vazio para composições com RM.",
                "itens": ["Morellonomicon", "Cajado do Vazio"]
              },
              {
                "nomeConjunto": "VENDA AS BOTAS (LATE GAME)",
                "dicaDoAutor": "Como você tem um item de suporte ocupando um slot, é mais eficaz vender suas botas no final do jogo. Surto da Tempestade compensará a perda de penetração mágica e aumentará ainda mais seu dano.",
                "itens": ["Surto da Tempestade"]
              }
            ]
          }
        ]
      }
    ]
  }
}`;

let parsedTeemoItemGuideData: TeemoItemGuideData | null = null;
let parsingErrorTeemoItemGuide: string | null = null;
try {
    parsedTeemoItemGuideData = JSON.parse(teemoItemGuideJsonString);
} catch (e) {
    console.error("Failed to parse Teemo item guide JSON:", e);
    parsingErrorTeemoItemGuide = e instanceof Error ? `Erro ao processar guia de itens do Teemo: ${e.message}` : "Erro desconhecido ao processar guia de itens do Teemo.";
}

const teemoItemExplanationsJsonString = `{
  "guia_de_itens": {
    "itens_iniciais": [
      {
        "nome": "Poção de Vida vs. Poção com Refil",
        "icon": "https://www.mobafire.com/images/item/health-potion-64x.png",
        "descricao": "Poção de Vida vs. Poção com Refil é um debate frequente. Alguns preferem a cura da Poção com Refil ao longo do jogo, economizando ouro para dois usos. Outros preferem a cura ligeiramente maior das poções normais, sem precisar delas mais tarde. Geralmente, se você começar com o Selo Negro, é melhor pegar a Poção com Refil, enquanto o Anel de Doran será muito melhor com as 3 poções básicas. Pelo preço, você obterá mais vida com 3 Poções de Vida em comparação com a Poção com Refil. No entanto, com a Poção com Refil, você terá um suprimento constante de sustain toda vez que voltar à base para recarregá-la. Você também pode simplesmente pegar a Poção com Refil após a fase de rotas."
      },
      {
        "nome": "Anel de Doran",
        "icon": "https://www.mobafire.com/images/item/dorans-ring-64x.png",
        "descricao": "Anel de Doran é um dos melhores itens iniciais para o Teemo, em praticamente todas as situações. Você ganha um grande aumento de dano em todas as suas habilidades, especialmente no Tiro Tóxico, enquanto também ganha sustain de mana e mais dano ao contato em minions. Você também receberá uma boa quantidade de vida. Causa mais dano e farma com mais facilidade."
      },
      {
        "nome": "Selo Negro",
        "icon": "https://www.mobafire.com/images/item/dark-seal-64x.png",
        "descricao": "Selo Negro é basicamente o mesmo item que o Anel de Doran, a maior diferença, no entanto, é a falta de vida, dano ao contato e sustain de mana. Apesar disso, se você conseguir acumulá-lo totalmente, o Ladrão de Almas de Mejai se torna um dos itens de escalonamento de AP mais fortes do jogo para criar um efeito bola de neve. É um item arriscado de se pegar, pois morrer faz você perder seus acúmulos, dos quais você precisa de 25 para escalar totalmente."
      },
      {
        "nome": "Escudo de Doran",
        "icon": "https://www.mobafire.com/images/item/dorans-shield-64x.png",
        "descricao": "O Escudo de Doran não tem muito uso para nós now que existem itens, runas e builds melhores que nos ajudam a mitigar o dano de campeões com poke pesado. Ventos Revigorantes é a runa que frequentemente pegamos para mitigar dano, o que é semelhante ao que este item costumava ser usado. Se você pegar este item, o Anel de Doran será bloqueado, embora você ainda possa pegar o Selo Negro."
      },
      {
        "nome": "Espinho Dimensional de Zaz'Zak",
        "icon": "https://www.mobafire.com/images/item/zazzaks-realmspike-64x.png",
        "descricao": "Este é o item da série de suporte que evolui do Atlas Mundial para a forma secundária de Bússola Rúnica, que proporciona ao Teemo uma vantagem significativa, independentemente de ele estar jogando com um estilo de Queimadura (Burn) ou Explosão (Burst). Os outros itens de suporte realmente não têm boa sinergia com ele. Este item contribui muito para o dano de seus cogumelos no final do jogo."
      }
    ],
    "escolhas_de_botas": [
      {
        "nome": "Sapatos do Feiticeiro",
        "icon": "https://www.mobafire.com/images/item/sorcerers-shoes-64x.png",
        "descricao": "Aumentarão drasticamente seu dano geral em tudo o que você faz devido à penetração mágica fixa de 18. Não o protegerão de forma alguma em comparação com as outras opções defensivas. É visto em quase todas as builds e acumula muito bem com full AP. No entanto, com as mudanças no Dente de Nashor, as Grevas do Berserker são uma escolha melhor, oferecendo mais."
      },
      {
        "nome": "Grevas do Berserker",
        "icon": "https://www.mobafire.com/images/item/berserkers-greaves-64x.png",
        "descricao": "É uma opção incrível ao jogar com Pressione o Ataque, pois facilita o acúmulo de velocidade de ataque, o kiting e o farm de forma mais eficaz desde o início. Se você estiver jogando com qualquer outra runa, obterá mais benefícios dos Sapatos do Feiticeiro, então não seria tão benéfico para o uso principal, que é split-push e duelos contra lutadores/tanques."
      },
      {
        "nome": "Zéfiro",
        "icon": "https://www.mobafire.com/images/item/zephyr-64x.png",
        "descricao": "Para responder sua pergunta, com certeza. Zéfiro é muito útil se você está jogando um estilo de jogo mais focado em On-Hit, kiting e luta no final do jogo, como uma evolução das Grevas do Berserker. A velocidade de movimento bônus ao contato é substancialmente aumentada, especialmente para quem joga na selva com Celeridade e Caminhar Sobre as Águas com o Esmigalhas e a passiva de Mover Rápido ativada."
      },
      {
        "nome": "Passos de Mercúrio",
        "icon": "https://www.mobafire.com/images/item/mercurys-treads-64x.png",
        "descricao": "Ajudarão em jogos difíceis onde você enfrenta muito AP com muito controle de grupo (CC), como Morgana, Lux ou Swain; caso contrário, outro item de RM seria preferível. Não é uma boa escolha se for apenas um campeão com muito AP ou CC. A tenacidade extra que oferecem ajudará a reduzir ligeiramente seus efeitos, ao mesmo tempo que aumenta nossa já baixa resistência mágica."
      },
      {
        "nome": "Botas Galvanizadas de Aço",
        "icon": "https://www.mobafire.com/images/item/plated-steelcaps-64x.png",
        "descricao": "Protegerão você contra muitos campeões que são especialistas em causar dano com ataques básicos, mas que não causam muito dano on-hit de itens como Lâmina do Rei Destruído ou Limite da Razão. O dano on-hit é completamente ignorado, então não compre contra uma Irelia. Campeões como Draven, Udyr e até Riven. Não se limita apenas a eles, se você se encontrar contra mais atacantes com dano fortalecido."
      },
      {
        "nome": "Botas da Rapidez",
        "icon": "https://www.mobafire.com/images/item/boots-of-swiftness-64x.png",
        "descricao": "São usadas contra campeões com muita mobilidade ou muitas habilidades de lentidão que precisamos evitar, muitas vezes com Agilidade nos Pés como nossa runa principal. Geralmente, é uma escolha segura, em vez de agressiva como as outras. Você realmente não precisa delas contra a maioria dos campeões. É simplesmente uma muleta para te ajudar a ser móvel; basta colocar mais pontos no seu (W) no início."
      }
    ],
    "itens_principais_e_situacionais": [
      {
        "nome": "Dente de Nashor",
        "icon": "https://www.mobafire.com/images/item/nashors-tooth-64x.png",
        "descricao": "Seu principal propósito é conceder uma boa quantidade de Velocidade de Ataque junto com um farm consistente para transicionar para o poke nos campeões inimigos durante a fase de rotas. É ótimo para causar dano de poke, lutas prolongadas e burst, complementando o Tiro Tóxico e o dano on-hit da Perdição de Lich. É um dos melhores itens que dão um pico de poder no início e meio do jogo, embora perca força no final."
      },
      {
        "nome": "Tormento de Liandry",
        "icon": "https://www.mobafire.com/images/item/liandrys-anguish-64x.png",
        "descricao": "Armadilha Venenosa e Dardo Ofuscante recebem um bom aumento de dano contra campeões em geral. É sempre construído para o final do jogo, mesmo que você decida por uma build diferente, pois os cogumelos são extremamente úteis para seu controle de mapa e defesa no final do jogo, mesmo que todos tenham Lente do Oráculo. Combinado com Malevolência, prova ser um dos maiores picos de dano que vimos em muito tempo."
      },
      {
        "nome": "Tocha de Fogo Negro",
        "icon": "https://www.mobafire.com/images/item/blackfire-torch-64x.png",
        "descricao": "Funciona aumentando a quantidade de dano que você causa com base em quantos alvos você está danificando com habilidades. Em princípio, se configurado corretamente, você poderia acumular preventivamente em muitas rotas, acampamentos e campeões adversários com (R) ao mesmo tempo, aumentando seu AP geral em 100-200 por um curto período, o que é absolutamente insano, já que a queimadura se acumula com outros efeitos de dano ao longo do tempo."
      },
      {
        "nome": "Malevolência",
        "icon": "https://www.mobafire.com/images/item/malignance-64x.png",
        "descricao": "APENAS PARA COGUMELOS. Malevolência tem um efeito poderoso e dominante. Não é recomendado para o início do jogo ou como primeira escolha, porque você precisa de um início de jogo para fazer a transição para os cogumelos. Ele pode lançar vários campos de dano em área e ativar a Colheita Sombria, algo que o Tormento de Liandry nunca conseguiu fazer. Isso o torna extremamente quebrado, causando até 3000 de dano com um único cogumelo."
      },
      {
        "nome": "Chama Sombria",
        "icon": "https://www.mobafire.com/images/item/shadowflame-64x.png",
        "descricao": "É um item incrível. É um dos itens com melhor custo-benefício do jogo! 120 de AP, acertos críticos com 35% de vida e 10 de penetração mágica fixa é absolutamente absurdo. Você pode combinar este item com o Tormento de Liandry com certas builds de runas para realmente punir as pessoas nas fases iniciais do jogo, onde o Teemo é mais forte. Quando você chega ao final do jogo, as pessoas caem como moscas."
      },
      {
        "nome": "Morellonomicon",
        "icon": "https://www.mobafire.com/images/item/morellonomicon-64x.png",
        "descricao": "Foi muito alterado ao longo dos anos para combater o 'sustain creep' e também para ajudar no geral a causar mais dano, mas hoje em dia o sustain não é um grande problema, a menos que você esteja lidando com composições como Soraka ou Vladimir, já que ele não oferece muito mais para o seu dano, e o Incendiar já possui um corta-cura embutido, embora com um longo tempo de recarga."
      },
      {
        "nome": "Perdição de Lich",
        "icon": "https://www.mobafire.com/images/item/lich-bane-64x.png",
        "descricao": "É um item muito poderoso para o Teemo quando ele fica forte no início do jogo após comprar o Dente de Nashor. Teemo pode abusar dele com W-E, Q-E ou R-E se tiver tempo suficiente para resetar o tempo de recarga de 1,5s. Como o dano básico do Teemo é On-Hit e escala com AP, ele vai derreter qualquer um em um combo quando combinado com Tiro Tóxico, Dente de Nashor e Capuz da Morte de Rabadon."
      },
      {
        "nome": "Ímpeto Cósmico",
        "icon": "https://www.mobafire.com/images/item/cosmic-drive-64x.png",
        "descricao": "Oferece um sólido bônus de velocidade de movimento ao atingir um inimigo com seu ataque básico. Tem alta sinergia com Agilidade nos Pés, focando em maximizar seu (W) e outros itens como a Perdição de Lich para entrar e sair rapidamente com alta mobilidade. Também tem alguma utilidade em builds de cogumelos, mas é mais útil como um item de mobilidade para nós hoje em dia."
      },
      {
        "nome": "Capuz da Morte de Rabadon",
        "icon": "https://www.mobafire.com/images/item/rabadons-deathcap-64x.png",
        "descricao": "Combinado com todos os seus outros itens principais, como Tormento de Liandry, Morellonomicon e Perdição de Lich, resultará em um aumento tremendo de dano. No entanto, não é um item que você construiria primeiro, mas sim quando já tiver outros itens para complementá-lo. Portanto, normalmente é uma compra de 3º ou 4º item em muitas builds, ou uma compra final em outras."
      },
      {
        "nome": "Cajado do Vazio",
        "icon": "https://www.mobafire.com/images/item/void-staff-64x.png",
        "descricao": "Muitas vezes, destina-se apenas a campeões com muita resistência mágica. Se você estiver contra uma composição de campeões frágeis sem lutadores ou tanques, este item adicionará apenas 15 de Penetração Mágica, o que obviamente não é muito. Nesse caso, seria melhor construir outros itens para mais dano. É ótimo contra itens como Semblante Espiritual e Mandíbula de Malmortius."
      },
      {
        "nome": "Florescerto de Cripta",
        "icon": "https://www.mobafire.com/images/item/cryptbloom-64x.png",
        "descricao": "Muitos jogadores subestimam um item como o Florescerto de Cripta, que é efetivamente o mesmo que o Cajado do Vazio, mas desempenha um papel significativo no auxílio à sua equipe. Conseguir abates ou assistências cria uma área de cura que escala com AP, o que significa que, com 800-1000 de AP, você curaria aliados próximos em 400-500+."
      },
      {
        "nome": "Limite da Razão",
        "icon": "https://www.mobafire.com/images/item/wits-end-64x.png",
        "descricao": "É um ótimo item para adquirir se você estiver enfrentando alguns campeões de AP com pouco ou nenhum CC. Funciona extremamente bem com Furacão de Runaan e Dente de Nashor, pois fornece dano on-hit escalável e grande resistência/tenacidade, tornando o split-push e as lutas de equipe no final do jogo mais impactantes. Idealmente jogado com Pressione o Ataque, pois outras builds têm pouca ou nenhuma sinergia."
      },
      {
        "nome": "Furacão de Runaan",
        "icon": "https://www.mobafire.com/images/item/runaans-hurricane-64x.png",
        "descricao": "É tudo sobre split-push. Beneficia-se de itens on-hit e builds de velocidade de ataque, permitindo que você atinja três alvos de uma vez. O Tiro Tóxico aplicará o dano on-hit antes de aplicar o dano ao longo do tempo, o que tem boa sinergia com builds de AP. No entanto, este é literalmente um item mais voltado para jogos de elo muito baixo."
      },
      {
        "nome": "Canhão Fumegante",
        "icon": "https://www.mobafire.com/images/item/rapid-firecannon-64x.png",
        "description": "É um item usado para ajudar contra magos difíceis de pokear, como Cassiopeia ou Ryze. Ele aumentará o alcance do seu ataque automático para um pouco além do alcance das habilidades deles, permitindo que você os pokeie e abata com segurança. Você não perderá nada em comparação com o Dente de Nashor, exceto o escalonamento de AP do (Q) e (E). Oferece muita sinergia com Agilidade nos Pés."
      },
      {
        "nome": "Ladrão de Almas de Mejai's",
        "icon": "https://www.mobafire.com/images/item/mejais-soulstealer-64x.png",
        "descricao": "É devastador se você se encontrar em uma situação em que está dominando e precisa de ainda mais escalonamento de AP do que defesa. O escalonamento de 35% do Capuz da Morte de Rabadon torna isso muito maior. Ele também oferecerá 100 de vida extra e 10% de velocidade de movimento, o que é ótimo, já que sempre foi o item de aposta destinado a dar dano ao custo de todo o resto."
      },
      {
        "nome": "Véu da Banshee",
        "icon": "https://www.mobafire.com/images/item/banshees-veil-64x.png",
        "descricao": "É um escudo de feitiço de uso único que impedirá que CC de uma habilidade ou dano de habilidade de qualquer tipo nos atinja, antes de entrar em um tempo de recarga de 40s. Observe que, devido ao META atual de magos com Perdição de Lich, ele NÃO impedirá o aprimoramento do ataque básico. Portanto, seria melhor optar por outra coisa que lhe forneça mais resistência + vida."
      },
      {
        "nome": "Ampulheta de Zhonya",
        "icon": "https://www.mobafire.com/images/item/zhonyas-hourglass-64x.png",
        "descricao": "É um item de estase que nos permite ficar invulneráveis por 2,5s para evitar todo o dano que está prestes a nos atingir ou que já está nos afligindo. Muitas vezes, acabará fazendo com que você seja morto se não tiver uma equipe para te dar suporte. O Guarda-braço da Caçadora é muito útil em confrontos de poke e engajamento AD pesados; portanto, se estiver com dificuldades, pegá-lo junto com um Cristal de Rubi ajuda muito."
      },
      {
        "nome": "Armadura de Warmog",
        "icon": "https://www.mobafire.com/images/item/warmogs-armor-64x.png",
        "descricao": "Pode parecer um item estranho para o Teemo, mas é um item incrível entre as lutas, e muito bom se você não usar runas/builds de sustain. Só é pensado em ser comprado bem no final do jogo com Aperto dos Mortos-Vivos. Esqueça este item se eles tiverem campeões com Lâmina do Rei Destruído, como Master Yi, Irelia, etc."
      },
      {
        "nome": "Bandana de Mercúrio",
        "icon": "https://www.mobafire.com/images/item/quicksilver-sash-64x.png",
        "descricao": "Não é de forma alguma um bom item em termos de sinergia com o Teemo. É usado apenas para counterar um campeão específico: Malzahar. O item foi nerfado e não funciona mais em campeões como Mordekaiser, portanto não tem lugar em nossas builds, não que realmente precisássemos usá-lo contra ele, a menos que estivesse forte. Então, lembre-se disso da próxima vez que lutar contra ele."
      }
    ]
  }
}`;

let parsedTeemoItemExplanationsData: ItemExplanationData | null = null;
let parsingErrorTeemoItemExplanations: string | null = null;
try {
    const parsedJson: { guia_de_itens: ItemExplanationCategories } = JSON.parse(teemoItemExplanationsJsonString);
    if (parsedJson && parsedJson.guia_de_itens) {
        parsedTeemoItemExplanationsData = parsedJson;
    } else {
        parsingErrorTeemoItemExplanations = "Estrutura do JSON de explicações de itens é inválida ou não contém 'guia_de_itens'.";
        console.error(parsingErrorTeemoItemExplanations);
    }
} catch (e) {
    console.error("Failed to parse Teemo item explanations JSON:", e);
    parsingErrorTeemoItemExplanations = e instanceof Error ? `Erro ao processar explicações de itens do Teemo: ${e.message}` : "Erro desconhecido ao processar explicações de itens do Teemo.";
}


const App: React.FC = () => {
  const [version, setVersion] = useState<string | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loadingInitialData, setLoadingInitialData] = useState<boolean>(true);
  const [errorInitialData, setErrorInitialData] = useState<string | null>(null);

  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [selectedMatchupData, setSelectedMatchupData] = useState<ChampionMatchupJSONData | null>(null);
  const [selectedAlternativeRunesData, setSelectedAlternativeRunesData] = useState<AlternativeMatchupData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [activeMainTab, setActiveMainTab] = useState<MainTab>('campeoes'); 

  const loadInitialData = useCallback(async () => {
    setLoadingInitialData(true);
    setErrorInitialData(null);
    try {
      const latestVersion = await fetchLatestVersion();
      setVersion(latestVersion);
      const championsData = await fetchChampionsData(latestVersion, DEFAULT_LANGUAGE);
      setChampions(Object.values(championsData.data));
    } catch (err) {
      if (err instanceof Error) {
        setErrorInitialData(`Falha ao carregar dados dos campeões: ${err.message}. Verifique sua conexão ou tente recarregar a página.`);
      } else {
        setErrorInitialData('Ocorreu um erro desconhecido ao carregar os dados.');
      }
      console.error(err);
    } finally {
      setLoadingInitialData(false);
    }
  }, []);
  
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleOpenModal = (champion: Champion) => {
    setSelectedChampion(champion);
    const normalizedChampionKey = normalizeChampionNameForMapKey(champion.name);
    
    const matchup = championMatchupsMap.get(normalizedChampionKey) || championMatchupsMap.get(champion.name) || null;
    setSelectedMatchupData(matchup);

    const altMatchup = alternativeRunesMap.get(normalizedChampionKey) || null;
    setSelectedAlternativeRunesData(altMatchup);

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChampion(null);
    setSelectedMatchupData(null);
    setSelectedAlternativeRunesData(null);
  };

  const filteredChampions = champions.filter(champion =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    champion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-lime-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 bg-amber-50 shadow-2xl my-4 md:my-8 rounded-lg">
        
        <div className="mb-8 border-b-2 border-amber-400 pb-3">
          <nav className="flex space-x-1 sm:space-x-2 justify-center sm:justify-start flex-wrap" role="tablist" aria-label="Navegação Principal">
            <button
              onClick={() => setActiveMainTab('campeoes')}
              className={`py-2 px-4 sm:px-6 rounded-t-lg font-semibold text-xs sm:text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 shadow-md
                ${activeMainTab === 'campeoes' 
                  ? 'bg-lime-700 text-white border-b-2 border-lime-800' 
                  : 'bg-amber-200 text-lime-800 hover:bg-amber-300 hover:text-lime-900 border-b-2 border-amber-300'
                }`}
              aria-selected={activeMainTab === 'campeoes'}
              role="tab"
            >
              Campeões
            </button>
            <button
              onClick={() => setActiveMainTab('runas')}
              className={`py-2 px-4 sm:px-6 rounded-t-lg font-semibold text-xs sm:text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 shadow-md
                ${activeMainTab === 'runas' 
                  ? 'bg-lime-700 text-white border-b-2 border-lime-800' 
                  : 'bg-amber-200 text-lime-800 hover:bg-amber-300 hover:text-lime-900 border-b-2 border-amber-300'
                }`}
              aria-selected={activeMainTab === 'runas'}
              role="tab"
            >
              Runas do Teemo
            </button>
            <button
              onClick={() => setActiveMainTab('itens')}
              className={`py-2 px-4 sm:px-6 rounded-t-lg font-semibold text-xs sm:text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 shadow-md
                ${activeMainTab === 'itens' 
                  ? 'bg-lime-700 text-white border-b-2 border-lime-800' 
                  : 'bg-amber-200 text-lime-800 hover:bg-amber-300 hover:text-lime-900 border-b-2 border-amber-300'
                }`}
              aria-selected={activeMainTab === 'itens'}
              role="tab"
            >
              Itens do Teemo
            </button>
          </nav>
        </div>

        {activeMainTab === 'campeoes' && (
          <>
            <div className="my-8 p-4 bg-amber-100 rounded-lg shadow border border-amber-600">
              <h2 className="text-2xl font-bold text-lime-800 mb-3">Buscar Campeão</h2>
              <input
                type="text"
                placeholder="Digite o nome ou título do campeão..."
                className="w-full p-3 border border-amber-700 rounded-md focus:ring-2 focus:ring-lime-600 focus:border-lime-600 bg-white placeholder-stone-500 text-stone-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar Campeão"
              />
            </div>

            {loadingInitialData && <LoadingSpinner message="Carregando campeões do Teemo..." />}
            {errorInitialData && <ErrorMessage message={errorInitialData} onRetry={loadInitialData} />}
            
            {!loadingInitialData && !errorInitialData && version && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredChampions.length > 0 ? (
                  filteredChampions.map(champion => (
                    <ChampionCard 
                      key={champion.id} 
                      champion={champion} 
                      version={version} 
                      onClick={() => handleOpenModal(champion)}
                    />
                  ))
                ) : (
                  <p className="text-stone-600 col-span-full text-center py-8 text-xl">Nenhum campeão encontrado com o termo "{searchTerm}".</p>
                )}
              </div>
            )}
          </>
        )}

        {activeMainTab === 'runas' && (
          <>
            <TeemoRuneGuideSection 
              guideData={parsedTeemoRuneGuideData}
              loading={!parsedTeemoRuneGuideData && !parsingErrorTeemoRuneGuide}
              error={parsingErrorTeemoRuneGuide}
              onRetry={() => { /* No retry needed for inline data, but prop is expected */ }}
            />
            {parsedAllRunesData && !parsingErrorAllRunes && (
              <AllRunesGuideSection allRunesData={parsedAllRunesData} />
            )}
            {parsingErrorAllRunes && (
              <div className="my-8">
                <ErrorMessage message={parsingErrorAllRunes} />
              </div>
            )}
          </>
        )}

        {activeMainTab === 'itens' && (
          <>
            <TeemoItemGuideSection
              guideData={parsedTeemoItemGuideData}
              loading={!parsedTeemoItemGuideData && !parsingErrorTeemoItemGuide}
              error={parsingErrorTeemoItemGuide}
              onRetry={() => { /* No retry needed for inline data */}}
              version={version}
            />
            <TeemoItemExplanationSection
              explanationData={parsedTeemoItemExplanationsData}
              loading={!parsedTeemoItemExplanationsData && !parsingErrorTeemoItemExplanations}
              error={parsingErrorTeemoItemExplanations}
              onRetry={() => { /* No retry needed for inline data */}}
            />
          </>
        )}
        
      </main>
      <Footer />
      {isModalOpen && selectedChampion && version && (
        <ChampionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          championId={selectedChampion.id}
          championName={selectedChampion.name}
          championTitle={selectedChampion.title}
          matchupData={selectedMatchupData}
          alternativeMatchupData={selectedAlternativeRunesData}
          version={version}
          teemoGuideData={parsedTeemoRuneGuideData}
          loadingTeemoGuide={!parsedTeemoRuneGuideData && !parsingErrorTeemoRuneGuide}
          errorTeemoGuide={parsingErrorTeemoRuneGuide}
        />
      )}
    </div>
  );
};

export default App;
