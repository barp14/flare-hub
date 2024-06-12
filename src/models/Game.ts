import mongoose, { Schema, Document, Types } from 'mongoose';

interface ITeam {
  _id: Types.ObjectId;
  // Defina outros campos do seu modelo Team aqui
}

interface IGame extends Document {
  leagueOfLegendsTeams: Array<ITeam>;
  counterStrike2Teams: Array<ITeam>;
  valorantTeams: Array<ITeam>;
}

const gameSchema: Schema = new Schema({
  leagueOfLegendsTeams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  counterStrike2Teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  valorantTeams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

export const GameModel = mongoose.model<IGame>('Game', gameSchema);
