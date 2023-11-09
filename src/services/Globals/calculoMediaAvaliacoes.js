/*
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../firebaseConfigurations/firebaseConfig';

const getBuffetId = async (buffetData) => {
  try {
    const buffetNome = buffetData.nome;
    const buffetRef = ref(db, 'buffets');
    const buffetQuery = query(buffetRef, orderByChild('nome'), equalTo(buffetNome));
    const buffetSnapshot = await get(buffetQuery);

    console.log('Nome do buffet:', buffetNome);

    if (buffetSnapshot.exists()) {
      // Obtenha o ID do buffet correspondente ao nome
      const buffetId = Object.keys(buffetSnapshot.val())[0];
      console.log('Buffet ID encontrado:', buffetId);
      return buffetId;
    } else {
      console.error('Buffet não encontrado no banco de dados.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar o buffet:', error);
    return null;
  }
};

const calcularMediaAvaliacoes = async (buffetNome) => {
  try {
    // Busque o buffet com base no nome
    const buffetId = await getBuffetId(buffetNome);

    if (!buffetId) {
      console.error('Buffet não encontrado no banco de dados.');
      return 0;
    }

    const avaliacoesRef = ref(db, 'avaliacoes');
    const avaliacoesQuery = query(avaliacoesRef, orderByChild('buffetId'), equalTo(buffetId));
    const snapshot = await get(avaliacoesQuery);

    if (snapshot.exists()) {
      const avaliacoes = snapshot.val();
      const avaliacoesBuffet = Object.values(avaliacoes);

      if (avaliacoesBuffet.length > 0) {
        const totalAvaliacoes = avaliacoesBuffet.length;
        const somaAvaliacoes = avaliacoesBuffet.reduce(
          (soma, avaliacao) => soma + avaliacao.avaliacao,
          0
        );
        const media = somaAvaliacoes / totalAvaliacoes;
        return media;
      } else {
        // Não há avaliações para esse buffet
        return 0;
      }
    } else {
      // O nó "avaliacoes" não existe
      return 0;
    }
  } catch (error) {
    console.error('Erro ao calcular a média das avaliações:', error);
    return 0;
  }
};
 
export default calcularMediaAvaliacoes;
*/