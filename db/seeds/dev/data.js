/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const data = require('../../../initialData')

const createPiece = (knex, piece) => {
  return knex('piece').insert(piece)
}

const createOutfit = (knex, outfit) => {
  return knex('outfit').insert(outfit)
}

const createUser = async (knex, user) => {
  const userID = await knex('user').insert({
    name: user.user.name,
    email: user.user.email,
    password: user.user.password,
    username: user.user.username
  }, 'id');

  const piecePromises = user.piece.map(pie => {
    return createPiece(knex, {
      image: pie.image,
      note: pie.notes,
      category_id: pie.categoryID,
      user_id: userID[0]
    })
  })

  const outfitPromises = user.outfit.map(out => {
    return createOutfit(knex, {
      image: out.fullOutfitImage,
      note: out.notes,
      user_id: userID[0]
    })
  })

  return Promise.all([piecePromises, outfitPromises].flat())
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  try {
    await knex('outfit').del()
    await knex('piece').del()
    await knex('user').del() 

    let userPromises = data.map(user => {
      return createUser(knex, user);
    });

    return Promise.all(userPromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};