import { drizzle } from "drizzle-orm/mysql2";
import { clubs, standings, matches } from "./drizzle/schema.js";

const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/pes2013";

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL não está definida!");
  process.exit(1);
}

const db = drizzle(DATABASE_URL);

// Aguardar a conexão estar pronta
const connection = db.getConnection?.() || db;

// Dados dos 12 clubes
const clubsData = [
  { name: "Clube 1", owner: "Jogador 1", color: "#FF0000", logo: null },
  { name: "Clube 2", owner: "Jogador 2", color: "#0000FF", logo: null },
  { name: "Clube 3", owner: "Jogador 3", color: "#00FF00", logo: null },
  { name: "Clube 4", owner: "Jogador 4", color: "#FFFF00", logo: null },
  { name: "Clube 5", owner: "Jogador 5", color: "#FF00FF", logo: null },
  { name: "Clube 6", owner: "Jogador 6", color: "#00FFFF", logo: null },
  { name: "Clube 7", owner: "Jogador 7", color: "#FFA500", logo: null },
  { name: "Clube 8", owner: "Jogador 8", color: "#800080", logo: null },
  { name: "Clube 9", owner: "Jogador 9", color: "#FFC0CB", logo: null },
  { name: "Clube 10", owner: "Jogador 10", color: "#A52A2A", logo: null },
  { name: "Clube 11", owner: "Jogador 11", color: "#808080", logo: null },
  { name: "Clube 12", owner: "Jogador 12", color: "#008000", logo: null },
];

// Função para gerar o calendário de jogos (turno único)
function generateMatches(clubIds) {
  const matches = [];
  let matchId = 1;
  
  // Turno único com 11 rodadas
  for (let round = 1; round <= 11; round++) {
    // Algoritmo de round-robin
    const rotation = [];
    for (let i = 0; i < clubIds.length; i++) {
      rotation.push(clubIds[i]);
    }
    
    // Rotaciona os times para cada rodada
    if (round > 1) {
      const first = rotation[0];
      rotation.splice(0, 1);
      rotation.push(first);
    }
    
    // Cria os jogos da rodada
    for (let i = 0; i < rotation.length / 2; i++) {
      const homeClubId = rotation[i];
      const awayClubId = rotation[rotation.length - 1 - i];
      
      matches.push({
        id: matchId++,
        round,
        homeClubId,
        awayClubId,
        homeGoals: null,
        awayGoals: null,
        status: "scheduled",
        date: null,
      });
    }
  }
  
  return matches;
}

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...\n");

    // 1. Inserir clubes
    console.log("📋 Adicionando 12 clubes...");
    try {
      await db.insert(clubs).values(clubsData);
      console.log("✅ 12 clubes adicionados com sucesso!\n");
    } catch (error) {
      console.log("⚠️  Clubes podem já existir, continuando...\n");
    }

    // Obter IDs dos clubes inseridos
    const allClubs = await db.select().from(clubs);
    const clubIds = allClubs.map((c) => c.id);

    // 2. Criar tabela de classificação zerada
    console.log("📊 Criando tabela de classificação...");
    const standingsData = clubIds.map((clubId, index) => ({
      clubId,
      position: index + 1,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }));

    try {
      await db.insert(standings).values(standingsData);
      console.log("✅ Tabela de classificação criada!\n");
    } catch (error) {
      console.log("⚠️  Classificação pode já existir, continuando...\n");
    }

    // 3. Gerar e inserir 11 rodadas de jogos
    console.log("🎮 Gerando 11 rodadas de jogos...");
    const matchesData = generateMatches(clubIds);
    
    // Inserir em lotes para evitar problemas
    const batchSize = 20;
    try {
      for (let i = 0; i < matchesData.length; i += batchSize) {
        const batch = matchesData.slice(i, i + batchSize).map(m => ({
          round: m.round,
          homeClubId: m.homeClubId,
          awayClubId: m.awayClubId,
          homeGoals: m.homeGoals,
          awayGoals: m.awayGoals,
          status: m.status,
          date: m.date,
        }));
        await db.insert(matches).values(batch);
      }
      console.log(`✅ ${matchesData.length} jogos criados com sucesso!\n`);
    } catch (error) {
      console.log(`⚠️  Jogos podem já existir, continuando...\n`);
    }

    // Resumo
    console.log("════════════════════════════════════════");
    console.log("✨ SEED CONCLUÍDO COM SUCESSO! ✨");
    console.log("════════════════════════════════════════");
    console.log(`📋 Clubes: ${clubIds.length}`);
    console.log(`📊 Classificação: ${standingsData.length} posições`);
    console.log(`🎮 Jogos: ${matchesData.length} partidas (11 rodadas)`);
    console.log("════════════════════════════════════════\n");

    console.log("📝 Próximas ações:");
    console.log("1. Acesse o painel administrativo em /admin");
    console.log("2. Edite os nomes dos clubes e donos");
    console.log("3. Comece a inserir os resultados dos jogos!");
    console.log("\n✅ Tudo pronto para começar o campeonato!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed do banco de dados:");
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();
