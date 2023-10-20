import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { BinaryToTextEncoding, createHash } from "crypto";
import { useState } from "react";

export default function Home() {
  // Definindo os tipos de hashs suportados e tipos de codificação
  const hashsTypes = ["md5", "sha1", "sha224", "sha256", "sha384", "sha512"];
  const encodeTypes: BinaryToTextEncoding[] = ["hex", "binary", "base64"];

  // Estados para controlar a entrada, o resultado do hash, o tipo de hash e o tipo de codificação
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [hashType, setHashType] = useState("md5");
  const [encodeType, setEncodeType] = useState<BinaryToTextEncoding>("hex");

  // Função para gerar o hash
  function hashData() {
    const hash = createHash(hashType).update(input).digest(encodeType);
    setEncodeType("binary");
    setHash(hash);
    console.log("Hash:", hash);
  }

  // Função para copiar o hash para a área de transferência
  const handleCopyClick = () => {
    const textToCopy = hash;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Texto copiado");
    });
  };

  return (
    <>
      <Head>
        <title>Crie um novo aplicativo Next</title>
        <meta name="description" content="Gerado pelo aplicativo Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Gerador de hashs</h1>
        <div>
          <h1>Você está gerando hashs do tipo: {hashType}</h1>
          <div>
            {hashsTypes.map((hashType, index) => (
              <button
                onClick={() => setHashType(hashType)}
                style={{ margin: "0px 10px" }}
                key={index}
              >
                {hashType}
              </button>
            ))}
          </div>
          <h1>Você está gerando hashs com codificação: {encodeType}</h1>
          {encodeTypes.map((encodeType, index) => (
            <button
              onClick={() => setEncodeType(encodeType)}
              style={{ margin: "0px 10px" }}
              key={index}
            >
              {encodeType}
            </button>
          ))}
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <input
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite aqui"
            />
            <button onClick={hashData}>Clique aqui para gerar</button>
          </div>
        </div>
        <div>
          {hash && (
            <h1 onClick={handleCopyClick}>Clique no hash abaixo para copiar</h1>
          )}
          <h2 onClick={handleCopyClick}>{hash}</h2>
        </div>
      </main>
    </>
  );
}
