import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let favoritesCollection;

export default class FavoritesDAO{
    static async injectDB(conn){
        if(favoritesCollection){
            return;
        }
        try{
            favoritesCollection = await conn.db(process.env.MOVIEREVIEWS_NS).collection('favorites');

        }
        catch(e){
            console.error(`Unable to  connect in FavoritesDAO: ${e}`);
        }
    } 
    static async updateFavorites(userId, favorites){
        try{
            const updateResponse = await favoritesCollection.updateOne(
                { _id: userId},     // filter
                { $set: {favorites: favorites}},    //update
                { upsert: true}
            )
            return updateResponse
        }
        catch(e){
            console.error(`Unable to update favorites: ${e}`);
            return { error: e };
        }
    }

    static async getFavorites(id){
        let cursor;
        try {
            cursor = await favoritesCollection.find({
                _id: id
            });
            const favorites = await cursor.toArray();
            console.log(favorites);
            console.log(favorites[0]);
            return favorites[0];
        } catch(e){
            console.error(`Something went wrong in getFavorties: ${e}`);
            throw e;
        }
    }
}