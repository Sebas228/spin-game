export const suffleParticipants = (particpants: any[]) => {
  return [...particpants].sort(() => Math.random() - 0.5);
};

export const getRandomInIntervalSuffles = (arrayLeng: number, min: number, max: number) => {
  return arrayLeng * (Math.floor(Math.random() * (max - min + 1) + min));
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const colors = ['primary', 'secondary', 'accent', 'danger', 'success'];
export const randomIndexColor = () => Math.floor(Math.random() * colors.length);