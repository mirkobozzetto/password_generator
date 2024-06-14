import { createInterface } from "readline";

// readline  createInterface permet de lire et écrire dans la console
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => readline.question(query, resolve));
//  cela resaoud la promesse et retourne la reponse
// afin de pouvoir

const min = "abcdefghijklmnopqrstuvwxyz";
const maj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const spec = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

const generateRandom = (length, chars) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const askLength = async () => {
  while (true) {
    const lengthStr = await question("🔢 Combien de caractères ? (8-36)\n");
    const length = parseInt(lengthStr);

    if (!isNaN(length) && length >= 8 && length <= 36) {
      return length;
    }
    console.log("Erreur : La longueur doit être un nombre entre 8 et 36.");
  }
};

const generatePassword = async () => {
  const length = await askLength();
  // await askLength() retourne la longueur du mot de passe

  const useSpecStr = await question("🔣 Caractères spéciaux ? (y/n)\n");
  const useSpec = useSpecStr.toLowerCase() === "y";

  const useNumsStr = await question("🔢 Chiffres ? (y/n)\n");
  const useNums = useNumsStr.toLowerCase() === "y";

  const useMajStr = await question("⬆️ Majuscules ? (y/n)\n");
  const useMaj = useMajStr.toLowerCase() === "y";

  // await question() retourne la réponse à la question posée

  let chars = min;
  // chars est initialisé avec les minuscules
  if (useSpec) chars += spec;
  if (useNums) chars += nums;
  if (useMaj) chars += maj;
  //  si d'autres valeurs sont demandées, on les ajoute à chars

  const password = generateRandom(length, chars);
  console.log(`Votre mot de passe généré est : ${password}`);

  readline.close();
  // ferme l'interface readline
};

generatePassword();
