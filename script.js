let currentStyleTag = null;
let currentScriptTag = null;

async function loadContent(topic) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "<p>Cargando contenido...</p>";

  try {
    //puto si lees esto JAJAJAJA 
    // Carga el puto codigo html
    const htmlResponse = await fetch(`${topic}/inicio.html`);
    if (!htmlResponse.ok) throw new Error(`Error al cargar HTML: ${htmlResponse.status}`);
    const htmlText = await htmlResponse.text();

    // Carga el puto estilo
    const cssResponse = await fetch(`${topic}/estilo.css`);
    if (!cssResponse.ok) throw new Error(`Error al cargar CSS: ${cssResponse.status}`);
    const cssText = await cssResponse.text();

    // Carga el script uwu
    const jsResponse = await fetch(`${topic}/mensaje.js`);
    if (!jsResponse.ok) throw new Error(`Error al cargar JS: ${jsResponse.status}`);
    const jsText = await jsResponse.text();

    // Limpiar estilo y script anterior facilito
    if (currentStyleTag) {
      currentStyleTag.remove();
      currentStyleTag = null;
    }

    if (currentScriptTag) {
      currentScriptTag.remove();
      currentScriptTag = null;
    }

    // Insertar nuevo estilo 😎 
    const styleTag = document.createElement("style");
    styleTag.textContent = cssText;
    document.head.appendChild(styleTag);
    currentStyleTag = styleTag;

    // Insertar nuevo script 😘
    const scriptTag = document.createElement("script");
    scriptTag.textContent = jsText;
    document.body.appendChild(scriptTag);
    currentScriptTag = scriptTag;

    // Parsear HTML si que si
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const container = doc.querySelector(".container");

    if (container) {
      contentDiv.innerHTML = container.innerHTML;
    } else {
      contentDiv.innerHTML = "<p>No se encontró el contenido esperado.</p>";
    }
  } catch (error) {
    console.error(error);
    contentDiv.innerHTML = `<p>Error al cargar contenido: ${error.message}</p>`;
  }
}