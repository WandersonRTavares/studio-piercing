// Ano dinâmico footer
document.getElementById('ano').textContent = new Date().getFullYear();

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('ativa'));

// Chat-box
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatBox = document.getElementById('chat');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');
const chatSend = document.getElementById('chat-send');

chatToggle.addEventListener('click', () => chatBox.classList.add('ativa'));
chatClose.addEventListener('click', () => chatBox.classList.remove('ativa'));

// Perguntas/respostas rápidas (pode aumentar)
const faq = [
    { k: 'horario', v: 'Atendemos segunda a sábado, 10h-19h.' },
    { k: 'valor', v: 'Valores a partir de R$ 60. Envie uma foto da região que avaliamos.' },
    { k: 'idade', v: 'Menores precisam estar acompanhados dos pais ou com autorização.' },
    { k: 'material', v: 'Usamos titânio grau cirúrgico e biomaterial.' },
    { k: 'agendar', v: 'Agende pelo Whats (11) 9 9999-9999 ou venha direto.' }
];

function criaMsg(text, quem) {
    const div = document.createElement('div');
    div.className = 'msg ' + quem;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function responde(msg) {
    const m = msg.toLowerCase();
    for (let i = 0; i < faq.length; i++) {
        if (m.includes(faq[i].k)) return faq[i].v;
    }
    return 'Pelo chat rápido posso responder sobre: horário, valores, idade, material e agendamento. Para outras dúvidas nos chame no Whats!';
}

chatSend.addEventListener('click', () => {
    const txt = chatInput.value.trim();
    if (!txt) return;
    criaMsg(txt, 'user');
    chatInput.value = '';
    setTimeout(() => criaMsg(responde(txt), 'bot'), 600);
});
chatInput.addEventListener('keyup', e => { if (e.key === 'Enter') chatSend.click(); });

// Carrega histórico (localStorage)
window.addEventListener('load', () => {
    const hist = JSON.parse(localStorage.getItem('chat_studio') || '[]');
    hist.forEach(h => criaMsg(h.text, h.quem));
});

// Salva histórico
window.addEventListener('beforeunload', () => {
    const msgs = [...chatBody.querySelectorAll('.msg')].map(m => ({ text: m.textContent, quem: m.classList.contains('user') ? 'user' : 'bot' }));
    localStorage.setItem('chat_studio', JSON.stringify(msgs));
});