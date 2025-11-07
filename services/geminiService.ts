
import { GoogleGenAI } from "@google/genai";
import { Task } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getPlanningSuggestions(tasks: Task[]): Promise<string> {
    const model = 'gemini-2.5-flash';

    const formattedTasks = tasks.map(task => ({
        description: task.description,
        dueDate: new Date(task.dueDate).toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' 
        }),
    }));
    
    const prompt = `
        Você é um assistente de planejamento de estudos amigável e eficiente. Seu objetivo é ajudar um(a) estudante a organizar suas tarefas de forma clara e direta.

        A data de hoje é: ${new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' })}.

        Aqui está uma lista das tarefas do(a) estudante e seus prazos:
        ${JSON.stringify(formattedTasks, null, 2)}

        Por favor, analise esta lista e forneça um cronograma sugerido. Para cada tarefa, sugira um bom dia para começar a trabalhar nela para evitar o estresse de última hora.

        Sua resposta deve ser:
        1. Amigável, mas muito concisa. Vá direto ao ponto.
        2. Apresentada como uma lista clara e fácil de ler.
        3. Para cada tarefa, use o formato exato fornecido no exemplo. Não use markdown.

        Exemplo de formato de saída:
        "Aqui está seu plano de estudos para se manter em dia ♡:

        - TAREFA: Redação de História
          ENTREGA: [Data]
          COMEÇAR ATÉ: [Data Sugerida]

        - TAREFA: Lista de Exercícios de Matemática
          ENTREGA: [Data]
          COMEÇAR ATÉ: [Data Sugerida]"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Falha ao obter sugestões de planejamento da IA.");
    }
}

export async function getTaskBreakdown(taskInfo: string): Promise<string> {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
        Você é um(a) coach de estudos amigável e brilhante, com uma personalidade como a do Cinnamoroll da Sanrio - doce, prestativo(a) и encorajador(a). ♡
        Um(a) estudante precisa de ajuda para dividir uma tarefa complexa em passos menores e gerenciáveis.

        Aqui está a descrição da tarefa pelo(a) estudante:
        "${taskInfo}"

        Sua tarefa é fornecer um plano de ação passo a passo para ajudar o(a) estudante a completar esta tarefa. 
        Sua resposta deve ser:
        1. Clara e estruturada, preferencialmente como uma lista numerada ou com marcadores.
        2. Divida a tarefa em passos lógicos e acionáveis (ex: Pesquisar, Esboçar, Rascunhar, Revisar).
        3. Ofereça dicas úteis ou encorajamento ao longo do caminho.
        4. Use um tom fofo, positivo e motivacional. Use emojis como ☁️✨📝💖 e corações ♡.
        
        Exemplo de formato de saída:
        "Claro que posso ajudar com isso! Vamos fazer um plano juntos(as)! ♡☁️✨

        Aqui está um pequeno roteiro para te ajudar com sua redação:

        1.  **Entenda o Tema (Dia 1):** Primeiro, vamos ter certeza de que sabemos exatamente o que o enunciado está pedindo! Leia algumas vezes e destaque as palavras-chave. 💖
        2.  **Pesquise e Colete Informações (Dias 2-3):** Hora de virar detetive! Vamos encontrar ótimas fontes. Tente procurar livros na biblioteca e artigos acadêmicos online. Faça muitas anotações! 📝
        3.  **Crie um Esboço (Dia 4):** Um bom plano torna a escrita muito mais fácil! Vamos esboçar seus pontos principais e como eles se conectarão. ♡
        4.  ...e assim por diante."
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Falha ao obter a divisão da tarefa da IA.");
    }
}