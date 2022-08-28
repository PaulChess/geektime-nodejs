const choices = ['rock', 'paper', 'scissors']

const choices_en_zh_map = {
  'rock': '石头',
  'paper': '布',
  'scissors': '剪刀'
}

const playerChoice = process.argv[process.argv.length - 1]
const computerChoice = choices[Math.floor(Math.random() * choices.length)]

console.log('玩家选择:', choices_en_zh_map[playerChoice])
console.log('电脑选择:', choices_en_zh_map[computerChoice])

if (playerChoice === computerChoice) {
  console.log('平局')
} else if (
  (computerChoice === 'rock' && playerChoice === 'paper') ||
  (computerChoice === 'paper' && playerChoice === 'scissors') ||
  (computerChoice === 'scissors' && playerChoice === 'rock')
)  {
  console.log('You Win!')
} else {
  console.log('You Lose~')
}