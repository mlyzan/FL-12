export const computer = () => {
  let computerChoice = Math.random();
  if (computerChoice < 0.34) {
    computerChoice = 'Rock';
  } else if (computerChoice <= 0.67) {
    computerChoice = 'Paper';
  } else {
    computerChoice = 'Scissors';
  }
  return computerChoice;
};
