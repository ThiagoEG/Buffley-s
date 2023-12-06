const Entradas = [
    {
      id: 1,
      nome: 'Coxinha de Frango',
      porcao: '20 unidades',
      tempoPreparo: '60 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Peito de Frango', quantidade: '500g', valor: 6.0 },
        { nome: 'Massa de coxinha', quantidade: '20 unidades', valor: 4.0 },
        { nome: 'Requeijão', quantidade: '1/2 xícara', valor: 2.0 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.5 },
      ],
    },
    {
      id: 2,
      nome: 'Bolinho de Queijo',
      porcao: '15 unidades',
      tempoPreparo: '40 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Queijo muçarela', quantidade: '200g', valor: 3.0 },
        { nome: 'Massa de mandioca', quantidade: '15 unidades', valor: 3.5 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.0 },
      ],
    },
    {
      id: 3,
      nome: 'Rissole de Camarão',
      porcao: '12 unidades',
      tempoPreparo: '45 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Camarões pequenos', quantidade: '250g', valor: 8.0 },
        { nome: 'Massa para rissole', quantidade: '12 unidades', valor: 5.0 },
        { nome: 'Creme de leite', quantidade: '1/2 xícara', valor: 2.5 },
        { nome: 'Limão', quantidade: '1 unidade', valor: 1.0 },
      ],
    },
    {
      id: 4,
      nome: 'Pastel de Carne',
      porcao: '10 unidades',
      tempoPreparo: '30 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Carne moída', quantidade: '300g', valor: 4.0 },
        { nome: 'Massa para pastel', quantidade: '10 unidades', valor: 3.0 },
        { nome: 'Cebola', quantidade: '1 unidade', valor: 1.0 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.0 },
      ],
    },
    {
      id: 5,
      nome: 'Bolinho de Bacalhau',
      porcao: '20 unidades',
      tempoPreparo: '50 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Bacalhau dessalgado', quantidade: '200g', valor: 7.0 },
        { nome: 'Batata', quantidade: '4 unidades', valor: 3.0 },
        { nome: 'Salsinha', quantidade: '1/4 de xícara', valor: 2.0 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.5 },
      ],
    },
    {
      id: 6,
      nome: 'Empadinha de Palmito',
      porcao: '12 unidades',
      tempoPreparo: '45 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Palmito', quantidade: '1 lata', valor: 5.0 },
        { nome: 'Massa para empadinha', quantidade: '12 unidades', valor: 4.0 },
        { nome: 'Azeitonas verdes', quantidade: '1/2 xícara', valor: 2.0 },
        { nome: 'Óleo para pincelar', quantidade: 'q.b.', valor: 1.0 },
      ],
    },
    {
      id: 7,
      nome: 'Esfiha de Carne',
      porcao: '16 unidades',
      tempoPreparo: '55 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Carne moída', quantidade: '400g', valor: 5.0 },
        { nome: 'Massa para esfiha', quantidade: '16 unidades', valor: 3.5 },
        { nome: 'Cebola', quantidade: '1 unidade', valor: 1.0 },
        { nome: 'Limão', quantidade: '1 unidade', valor: 1.0 },
      ],
    },
    {
      id: 8,
      nome: 'Quibe Frito',
      porcao: '20 unidades',
      tempoPreparo: '40 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Trigo para quibe', quantidade: '1 xícara', valor: 2.0 },
        { nome: 'Carne moída', quantidade: '500g', valor: 6.0 },
        { nome: 'Hortelã fresca', quantidade: '1/2 xícara', valor: 2.5 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.0 },
      ],
    },
    {
      id: 9,
      nome: 'Pasteizinhos de Queijo',
      porcao: '20 unidades',
      tempoPreparo: '35 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Queijo prato', quantidade: '200g', valor: 3.5 },
        { nome: 'Massa para pastel', quantidade: '20 unidades', valor: 3.0 },
        { nome: 'Orégano', quantidade: '1 colher de chá', valor: 1.0 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.0 },
      ],
    },
    {
      id: 10,
      nome: 'Croquetes de Frango',
      porcao: '16 unidades',
      tempoPreparo: '50 minutos',
      categoria: 'Petiscos',
      ingredientes: [
        { nome: 'Frango cozido e desfiado', quantidade: '300g', valor: 4.5 },
        { nome: 'Molho bechamel', quantidade: '1/2 xícara', valor: 2.5 },
        { nome: 'Pão ralado', quantidade: '1 xícara', valor: 2.0 },
        { nome: 'Óleo para fritar', quantidade: 'q.b.', valor: 2.5 },
      ],
    },

        {
          id: 11,
          nome: 'Bruschetta de Tomate e Manjericão',
          porcao: '4 porções',
          tempoPreparo: '15 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Pão italiano', quantidade: '4 fatias', valor: 2.0 },
            { nome: 'Tomate maduro', quantidade: '2 unidades', valor: 1.5 },
            { nome: 'Manjericão fresco', quantidade: '1/2 xícara', valor: 2.0 },
            { nome: 'Azeite de Oliva', quantidade: '2 colheres de sopa', valor: 2.0 },
            { nome: 'Alho', quantidade: '1 dente', valor: 0.5 },
          ],
        },

        {
          id: 12,
          nome: 'Carpaccio de Beterraba',
          porcao: '2 porções',
          tempoPreparo: '10 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Beterraba', quantidade: '2 unidades', valor: 2.0 },
            { nome: 'Queijo de cabra', quantidade: '1/2 xícara', valor: 3.0 },
            { nome: 'Nozes', quantidade: '1/4 de xícara', valor: 2.5 },
            { nome: 'Mel', quantidade: '2 colheres de sopa', valor: 2.0 },
          ],
        },

        {
          id: 13,
          nome: 'Canapés de Salmão Defumado',
          porcao: '12 porções',
          tempoPreparo: '20 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Pão de forma', quantidade: '6 fatias', valor: 1.0 },
            { nome: 'Salmão defumado', quantidade: '100g', valor: 4.0 },
            { nome: 'Cream cheese', quantidade: '1/2 xícara', valor: 2.5 },
            { nome: 'Cebolinha', quantidade: '2 colheres de sopa', valor: 1.0 },
          ],
        },

        {
          id: 14,
          nome: 'Tábua de Queijos e Frutas',
          porcao: '4 porções',
          tempoPreparo: '10 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Queijo brie', quantidade: '100g', valor: 3.0 },
            { nome: 'Queijo cheddar', quantidade: '100g', valor: 2.5 },
            { nome: 'Uvas', quantidade: '1 cacho', valor: 1.5 },
            { nome: 'Framboesas', quantidade: '1 xícara', valor: 3.0 },
          ],
        },

        {
          id: 15,
          nome: 'Rolinhos de Presunto e Queijo',
          porcao: '6 porções',
          tempoPreparo: '15 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Presunto fatiado', quantidade: '12 fatias', valor: 3.0 },
            { nome: 'Queijo suíço', quantidade: '6 fatias', valor: 2.0 },
            { nome: 'Mostarda', quantidade: '2 colheres de sopa', valor: 1.0 },
          ],
        },

        {
          id: 16,
          nome: 'Mini Quiches de Espinafre',
          porcao: '12 porções',
          tempoPreparo: '30 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Massa para torta', quantidade: '1 pacote', valor: 2.5 },
            { nome: 'Espinafre', quantidade: '1 xícara', valor: 1.0 },
            { nome: 'Queijo feta', quantidade: '1/2 xícara', valor: 2.5 },
            { nome: 'Ovo', quantidade: '3 unidades', valor: 1.5 },
          ],
        },

        {
          id: 17,
          nome: 'Ceviche de Camarão',
          porcao: '4 porções',
          tempoPreparo: '20 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Camarão cru', quantidade: '300g', valor: 6.0 },
            { nome: 'Limão', quantidade: '4 unidades', valor: 1.0 },
            { nome: 'Cebola roxa', quantidade: '1/2 unidade', valor: 0.5 },
            { nome: 'Coentro fresco', quantidade: '1/2 xícara', valor: 2.0 },
          ],
        },

        {
          id: 18,
          nome: 'Espetinhos de Cogumelos',
          porcao: '4 porções',
          tempoPreparo: '15 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Cogumelos', quantidade: '200g', valor: 3.0 },
            { nome: 'Azeite de Oliva', quantidade: '2 colheres de sopa', valor: 2.0 },
            { nome: 'Alecrim fresco', quantidade: '1 colher de chá', valor: 0.5 },
          ],
        },

        {
          id: 19,
          nome: 'Dip de Abacate e Tomate',
          porcao: '4 porções',
          tempoPreparo: '10 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Abacate', quantidade: '2 unidades', valor: 3.0 },
            { nome: 'Tomate', quantidade: '1 unidade', valor: 1.0 },
            { nome: 'Cebola', quantidade: '1/2 unidade', valor: 0.5 },
            { nome: 'Coentro fresco', quantidade: '1/4 de xícara', valor: 2.0 },
          ],
        },

        {
          id: 20,
          nome: 'Sopa de Abóbora',
          porcao: '4 porções',
          tempoPreparo: '30 minutos',
          categoria: 'Entradas',
          ingredientes: [
            { nome: 'Abóbora', quantidade: '500g', valor: 2.0 },
            { nome: 'Creme de leite', quantidade: '1/2 xícara', valor: 2.0 },
            { nome: 'Caldo de legumes', quantidade: '2 xícaras', valor: 3.0},
          ],
        }
    ];

    
export default Entradas;