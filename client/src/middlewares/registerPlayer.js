import * as actions from '../actions'

export default store => next => async action => {
  if(action.type !== actions.REGISTER) return next(action)
  if(action.completed) return next(action)

  const state = store.getState()
  if(
    !state.network.web3 ||
    !state.contracts.ethernaut ||
    !action.nickname ||
    !state.player.address ||
    !state.network.gasPrice
  ) return next(action)

  console.asyncInfo(`@good Registering player...`)

  console.log("action.telegram = ", action.telegram);

  let completed = await registerPlayer(
    state.contracts.ethernaut,
    action.nickname,
    action.telegram,
    state.player.address,
    state.network.gasPrice
  )
  if(completed) {
    console.info(`@good Hello, ` + action.nickname +`! You have been successfully registered!`)
  }
  else {
    console.error(`@bad Failed to register`)
  }

  action.completed = completed
  next(action)
}

async function registerPlayer(ethernaut, nickname, telegram, player, gasPrice) {
  return new Promise(async function(resolve) {
    const tx = await ethernaut.register(nickname, telegram);
    if (tx) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
