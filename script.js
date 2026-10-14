// Personalize o texto e a assinatura antes de publicar.
const letterText = `Eu não sei muito bem como entregar flores, não sei como fazer essas coisas sem parecer idiota. Então, pensei que talvez escrever uma carta fosse uma maneira bonita de fazer isso pra você.

Não escrevi isso com o propósito de ser romântico. Só queria encontrar uma forma diferente de demonstrar que penso em você, que presto atenção nas pequenas coisas e que, de alguma maneira, você acabou se tornando alguém especial para mim.

Quando descobri que esse era o seu anime favorito, pensei: por que não? Por que não escrever algo para a garota de quem eu gosto na forma de uma carta? Talvez seja uma ideia meio boba, talvez eu esteja sendo um pouco bobo, mas acho que, às vezes, são justamente essas pequenas atitudes que tornam as coisas especiais.

Eu poderia simplesmente falar isso em call, fingir que não pensei nessa surpresa ou deixar passar a oportunidade por medo de parecer estranho. Mas, sinceramente, achei que seria muito mais legal tentar. Afinal, não é todo dia que encontramos alguém pra fazer algo diferente.

Não sei se vou conseguir expressar tudo da maneira certa, mas espero que você consiga perceber a intenção por trás dessas palavras. Não quero que essa carta seja vista como uma grande declaração ou como uma tentativa de transformar algo simples em algo complicado. Quero apenas que ela seja uma lembrança de que existe alguém que pensa em você, que quis tirar um tempinho do próprio dia para preparar algo que pudesse arrancar um sorriso seu.

E, se eu conseguir isso, mesmo que por alguns segundos, já vou considerar que valeu a pena.

Talvez eu ainda não saiba entregar flores cor de vinho, nem saiba encontrar as palavras certas. Talvez eu continue sendo um pouco bobo quando o assunto é demonstrar o que sinto. Mas acho que não tem problema. No fim das contas, prefiro ser um bobo que tenta demonstrar o que sente a alguém que deixa passar oportunidades por medo de tentar.

Então, aqui está minha pequena surpresa. Uma carta, inspirada em algo de que você gosta, feita por alguém que morre em gank no metrô, mas que teve vontade de fazer algo por você.

Espero que você goste. Fiz com carinho, e isso, por enquanto, é tudo o que eu queria que você soubesse: que eu sempre estarei aqui por você e, mesmo nos momentos de briga e desentendimento, eu quero estar com você e nunca conseguiria te deixar sozinha. Você sempre pode contar comigo e sempre terá todo o meu empenho na hora de fazer library com você grade 5. Obrigado por sempre melhorar meu dia, e essa carta é 1% disso.`;

const senderName = 'O Maior idiota do mundo';

const body = document.body;
const openButton = document.getElementById('openLetter');
const copy = document.getElementById('letterCopy');
const cursor = document.getElementById('cursor');
const signature = document.getElementById('signature');
const sender = document.getElementById('sender');
const endNote = document.getElementById('endNote');
const restart = document.getElementById('restart');
const petals = document.getElementById('petals');

let typingTimer;
let finishTimer;

sender.textContent = senderName;

// Cria as pétalas decorativas.
for (let i = 0; i < 18; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${13 + Math.random() * 16}s`;
  petal.style.animationDelay = `${Math.random() * -26}s`;
  petal.style.setProperty(
    '--drift',
    `${Math.round(Math.random() * 180 - 90)}px`
  );
  petal.style.transform = `scale(${0.55 + Math.random() * 0.9})`;
  petals.appendChild(petal);
}

function startTyping() {
  clearTimeout(typingTimer);
  clearTimeout(finishTimer);

  copy.textContent = '';
  signature.classList.remove('show');
  endNote.classList.remove('show');
  restart.classList.remove('show');
  cursor.style.display = 'inline-block';

  let i = 0;
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function typeNext() {
    if (i < letterText.length) {
      copy.textContent += letterText.charAt(i);
      i++;

      const char = letterText.charAt(i - 1);
      const delay = reducedMotion
        ? 0
        : ('.!?…'.includes(char)
          ? 260
          : ',;:'.includes(char)
            ? 135
            : 29 + Math.random() * 26);

      typingTimer = setTimeout(typeNext, delay);

      if (i % 5 === 0) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      }
    } else {
      cursor.style.display = 'none';
      signature.classList.add('show');

      finishTimer = setTimeout(() => {
        endNote.classList.add('show');
        restart.classList.add('show');
      }, 700);
    }
  }

  typeNext();
}

openButton.addEventListener('click', () => {
  if (body.classList.contains('opened')) return;

  body.classList.add('opened');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  startTyping();
});

restart.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  startTyping();
});
