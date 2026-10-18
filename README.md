# Sabor na Brasa — site de delivery

Site responsivo para hamburgueria, pizzaria e açaíteria, feito com HTML, CSS e JavaScript puro.

## Como abrir no VS Code

1. Baixe e extraia o arquivo ZIP.
2. Abra o VS Code.
3. Vá em **Arquivo → Abrir Pasta** e selecione a pasta `sabor-na-brasa`.
4. Instale a extensão **Live Server** (Ritwick Dey), caso ainda não tenha.
5. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

Também é possível abrir o `index.html` diretamente no navegador, mas o Live Server facilita a visualização durante as alterações.

## Antes de publicar: configure o WhatsApp

1. Abra `script.js`.
2. No começo do arquivo, encontre:

   ```js
   const CONFIG = {
     whatsapp: "5500000000000",
     storeName: "Sabor na Brasa"
   };
   ```

3. Troque `5500000000000` pelo número real da loja, com código do país + DDD + número, **somente números**. Exemplo fictício: `5511999999999`.
4. Salve e teste o botão **Finalizar no WhatsApp**. O site abre o WhatsApp com os itens e subtotal do pedido preenchidos. A taxa de entrega, pagamento e confirmação são combinados na conversa.

## Como editar produtos e preços

No arquivo `script.js`, procure o array `products`. Cada produto possui:
- `id`: identificador único;
- `category`: `burger`, `pizza` ou `acai`;
- `name`: nome exibido;
- `description`: descrição;
- `price`: preço numérico em reais (ex.: `24.90`);
- `tag`: etiqueta curta;
- `image`: endereço da foto.

Para adicionar um produto, copie um objeto, use um `id` que ainda não existe e altere os campos.

## Fotos

As imagens atuais usam URLs do Unsplash e precisam de internet para carregar. Para usar fotos próprias, coloque as imagens em uma pasta `images` e altere os campos `image` no `script.js` e as imagens de fundo no `style.css`.

## Observações

- Cardápio, filtros, carrinho, quantidades e subtotal funcionam no navegador.
- Não há painel administrativo, banco de dados, pagamento online ou cálculo automático de entrega nesta versão.
- Preços e itens são exemplos. Revise tudo antes de usar comercialmente.
- O site não envia pedido sozinho: abre uma conversa no WhatsApp para o cliente confirmar.
