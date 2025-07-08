import mongoose from "mongoose";

const CategorieSchema = mongoose.Schema({
    name: {type: String},
}, {timestamps: true})

const CategorieModel = mongoose.model("categorie", CategorieSchema);
export default CategorieModel;