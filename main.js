// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return ({
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while(this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrg) {
      const sim = this.dna.reduce((acc, curr, index, arr) => {
        if (arr[index] === otherOrg.dna[index]) {
          return acc+1;
        } else {
          return acc;
        }
      }, 0);
      const percentShared = (sim / this.dna.length) * 100;
      const percentToDecimal = percentShared.toFixed(2);

      console.log(`specimen #${this.specimenNum} and specimen #${otherOrg.specimenNum} have ${percentToDecimal}% DNA in common.`);
    },
    willLikelySurvive() {
      let base = 0
      for (let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') {
          base++;
        }
      }
      if (base / this.dna.length >= 0.6) {
        return true;
      }else{
        return false;
      }
    }
  })
};

const survivingSpec = [];
let idCount = 1;

while (survivingSpec.length < 30) {
  let newOrg = pAequorFactory(idCount, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpec.push(newOrg);
  }
  idCount++;
}

console.log(survivingSpec);