import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/UserModel.js";
import dotenv from "dotenv";
import CustomerModel from "./models/CustomerModel.js";
import SupplierModel from "./models/SupplierModel.js";
import CategoryModel from "./models/CategoryModel.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster`);

// Login
app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({email: email});
    if (!user) {
      response.status(404).json({msg: "Couldn't find the email"});
    } else if (user.password !== password) {
      response.status(404).json({msg: "Incorrect password"});
    } else {
      // update lastLogin without changing timestamps
      await UserModel.findByIdAndUpdate(
        user._id, 
        { lastLogin: new Date() },
        { timestamps: false }
      );
      response.send({email: user, msg: "Logged in successfully"});
    }
  }
  catch (error) {
    response.status(500).json({error: "Unxpected error oucerred"});
  }
});

// Logout
app.post("/logout", async (request, response) => {
  response.send({msg: "Logged out successfully"});
});

// Get Users
app.get("/getUsers", async (request, response) => {
  try {
    const userList = await UserModel.find();
    response.send({userList: userList});
  } catch (error) {
    response.status(500).json({error: "Unexpected error oucerred"});
  }
});

// Add users
app.post("/addUser", async (request, response) => {
  try {
    const { username, email, password, permissions } = request.body;
    const user = await UserModel.findOne({email: email});
    if (user) {
      response.status(409).json({msg: "Email used already exists"});
    } else {
      const addUser = UserModel({username, email, password, permissions});
      await addUser.save();
      response.send({msg: "User added successfully", addUser});
    }
  } catch (error) {
    response.status(500).json({error: "Failed to add user"});
  }
})

// Delete User
app.delete("/deleteUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    await UserModel.findByIdAndDelete(userId);
    response.send({msg: "User deleted successfully"});
  } catch (error) {
    response.status(500).json({error: "Faild to delete user"});
  }
});

// Edit User
app.put("/editUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const {username, password, permissions} = request.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, password, permissions },
      { new: true }
    );
    response.send({msg: "User updated successfully", updatedUser});
  } catch (error) {
    response.status(500).json({error: "Failed to update user"});
  }
});

// Add Customer
app.post("/addCustomer", async (request, response) => {
  try {
    const { name, email, mobile } = request.body;
    const customer = await CustomerModel.findOne({name: name});
    if (customer) {
      response.status(409).json({msg: "Customer already exists"});
    } else {
      const addCustomer = CustomerModel({name, email, mobile});
      await addCustomer.save();
      response.send({msg: "Customer added successfully", addCustomer});
    }
  } catch (error) {
    response.status(500).json({error: "Failed to add customer"});
  }
});

// Get Customers
app.get("/getCustomers", async (request, response) => {
  try {
    const customerList = await CustomerModel.find();
    response.send({customerList: customerList});
  } catch (error) {
    response.status(500).json({error: "Unexpected error oucerred"});
  }
});

// Delete Customer
app.delete("/deleteCustomer/:id", async (request, response) => {
  try {
    const customerId = request.params.id;
    await CustomerModel.findByIdAndDelete(customerId);
    response.send({msg: "Customer deleted successfully"});
  } catch (error) {
    response.status(500).json({error: "Faild to delete customer"});
  }
});

// Edit Customer
app.put("/editCustomer/:id", async (request, response) => {
  try {
    const customerId = request.params.id;
    const {name, mobile} = request.body;
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      customerId,
      { name, mobile },
      { new: true }
    );
    response.send({msg: "Customer updated successfully", updatedCustomer});
  } catch (error) {
    response.status(500).json({error: "Failed to update customer"});
  }
});

// Add Supplier
app.post("/addSupplier", async (request, response) => {
  try {
    const { name, email, mobile, fax, address, tax } = request.body;
    const supplier = await SupplierModel.findOne({name: name});
    if (supplier) {
      response.status(409).json({msg: "Supplier already exists"});
    } else {
      const addSupplier = SupplierModel({name, email, mobile, fax, address, tax});
      await addSupplier.save();
      response.send({msg: "Supplier added successfully", addSupplier});
    }
  } catch (error) {
    response.status(500).json({msg: "Failed to add supplier"});
  }
});

// Get Suppliers
app.get("/getSuppliers", async (request, response) => {
  try {
    const supplierList = await SupplierModel.find();
    response.send({supplierList: supplierList});
  } catch (error) {
    response.status(500).json({error: "Unexpected error oucerred"});
  }
});

// Edit Supplier
app.put("/editSupplier/:id", async (request, response) => {
  try {
    const supplierId = request.params.id;
    const { name, mobile, fax, address, tax } = request.body;
    const updatedSupplier = await SupplierModel.findByIdAndUpdate(
      supplierId,
      { name, mobile, fax, address, tax },
      { new: true }
    );
    response.send({msg: "Supplier updated successfully", updatedSupplier});
  } catch (error) {
    response.status(500).json({error: "Failed to update supplier"})
  }
});

// Delete Supplier
app.delete("/deleteSupplier/:id", async (request, response) => {
  try {
    const supplierId = request.params.id;
    await SupplierModel.findByIdAndDelete(supplierId);
    response.send({msg: "Supplier deleted successfully"});
  } catch (error) {
    response.status(500).json({error: "Failed to delete supplier"});
  }
});

// Add Category
app.post("/addCategory", async (request, response) => {
  try {
    const { name } = request.body;
    const category = await CategoryModel.findOne({name: name});
    if (category) {
      response.status(409).json({msg: "Category already exists"});
    } else {
      const addCategory = CategoryModel({name});
      await addCategory.save();
      response.send({msg: "Category added successfully", addCategory});
    }
  } catch (error) {
    response.status(500).json({msg: "Failed to add category"});
  }
});

// Get Categories
app.get("/getCategories", async (request, response) => {
  try {
    const categoryList = await CategoryModel.find();
    response.send({categoryList: categoryList});
  } catch (error) {
    response.status(500).json({error: "Unexpected error ouccerred"});
  }
});

// Edit Category
app.put("/editCategory/:id", async (request, response) => {
  try {
    const categoryId = request.params.id;
    const { name } = request.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { name: true }
    );
    response.send({msg: "Category updated successfully", updatedCategory});
  } catch (error) {
    response.status(500).json({error: "Failed to update category"});
  }
});

// Delete Category
app.delete("/deleteCategory/:id", async (request, response) => {
  try {
    const categoryId = request.params.id;
    await CategoryModel.findByIdAndDelete(categoryId);
    response.send({msg: "Category deleted successfully"});
  } catch (error) {
    response.status(500).json({error: "Failed to delete categorie"});
  }
});

app.listen(process.env.PORT, () => console.log(`server is connected to port ${process.env.PORT}`));