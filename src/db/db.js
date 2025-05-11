import {db} from './db.config.js';
import { PutItemCommand, GetItemCommand, QueryCommand, DeleteItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const Table = "user_details"

const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: Table,
        Item: marshall(data)
    }
    try 
    {
        const command = new PutItemCommand(params);
        const result = await db.send(command);
        return { success: true, data: result }
    } 
    catch (error) 
    {
        console.error('Error inserting item:', error);
        return { success: false, data: error }
    }
}

const readAllUsers = async()=>{
    const params = {
    TableName: Table,
    };
    try 
    {
        const command = new ScanCommand(params);
        const result = await db.send(command);
        return { success: true, data: result }
    } 
    catch (error) 
    {
        return { success: false, data: error }
    }

}

const getUserById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: marshall({ [key]: value })
      };
      console.log('params', params)
    
      try {
        const command = new GetItemCommand(params);
        const result = await db.send(command);
        
        if (result.Item) {
          const jsObject = unmarshall(result.Item);
          return { success: true, data: jsObject }
        } else {
            return { success: false, data: "Data Not Found" }
        }
      } catch (error) {
        return { success: false, data: error }
    }
}

const deleteUserById = async(value, key = 'id' ) => {
    const params = {
        TableName: Table,
        Key: marshall({ [key]: value })
    };
    
    try {
        const command = new DeleteItemCommand(params);
        const result = await db.send(command);
        console.log('Item deleted:', result);
        return { success: true, data: result }
    } 
    catch (error) {
        console.error('Error deleting item:', error);
        return { success: false, data: error }
    }
}


export {
    createOrUpdate,
    readAllUsers,
    getUserById,
    deleteUserById
}