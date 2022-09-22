//Array of subcommands, must be in this array to run
let commandArray = ['read', 'create', 'update', 'destroy'];
//creates a variable to store data in
let dataStore;
let dataIndex;
//creates variable to store arguments
let argument = process.argv;
//adds some imports to be used
//imports fs
import * as fs from 'fs';
//imports create
import { create } from 'domain';
//imports exit
import {exit} from 'node:process';
import { arrayBuffer } from 'stream/consumers';

//Object that holds methods to be used based on subcommand
let commands = {
    read:   function(){
            fs.readFile('./pets.json','UTF-8', (error, data) => {
                dataStore = JSON.parse(data)
                if (error) {
                    console.error('Read Failed')
                    exit(1)
                } else {
                    if (!argument[3]){
                        console.log(dataStore)
                    } else if (dataStore[argument[3]] === undefined){
                        console.error('Usage: node pets.js read INDEX')
                        exit(1);
                    } else {
                        console.log(dataStore[argument[3]])
                    }
                }
            })
        },
    create: function(){
            fs.readFile('./pets.json','utf-8',(error,data)=>{
                if(error){
                    console.error('no file found')
                    exit(1);
                } else {
                    var obj ={
                        'age' : parseInt(argument[3]),
                        'kind' : argument[4],
                        'name' : argument[5]
                    };
                    var pets = JSON.parse(data)
                    pets.push(obj);
                    fs.writeFile('pets.json',JSON.stringify(pets),(error)=>{
                        if(error){
                            console.error(new Error(error));
                            exit(1);
                        } else {
                            console.log(pets[pets.length-1]);
                        }
                    })
                }
            })
        },
    update: function(){
            fs.readFile('./pets.json','utf-8',(error,data)=>{
                dataStore = JSON.parse(data)
                if (error){
                    console.error(new Error(error))
                } else if(!dataStore[argument[3]]){
                    console.error('Usage: node pets.js update INDEX AGE KIND NAME')
                } else {
                    dataIndex = dataStore[argument[3]]
                    dataIndex.age = parseInt(argument[4])
                    dataIndex.kind = argument[5]
                    dataIndex.name = argument[6]    
                    fs.writeFile('./pets.json',JSON.stringify(dataStore),(error)=>{
                        if(error){
                            console.error(new Error(error));
                            exit(1);
                        } else {
                            console.log(dataStore);
                        }
                    })
                }
            })
        },
    destroy: function(){
            fs.readFile('./pets.json','utf-8',(error,data)=> {
                dataStore = JSON.parse(data)
                if (error){
                    console.error(new Error(error))
                } else if (!dataStore[argument[3]]){
                    console.error('Usage: node pets.js destroy INDEX')
                } else {
                    dataStore.splice(argument[3], 1)
                    fs.writeFile('./pets.json',JSON.stringify(dataStore),(error)=>{
                        if(error){
                            console.error(new Error(error));
                            exit(1);
                        } else {
                            console.log(dataStore);
                        }
                    })
                }
            })
        } 
}
// error message to run if incorrect subcommand/no subcommand:
// console.error('Usage: node pet.js [read | create | update | destroy]');
// exit(1);

//Checks to see if the subcommand is filled in and is a real command
if (argument[2] === undefined || !commandArray.includes(argument[2], 0)){
    console.error('Failed Task, Usage: node pets.js [read | create | update | destroy]')
    exit(1)
}
//Checks to see what subcommand is ran then runs the instructions based on the subcommand
if (argument[2] == 'read'){
    commands.read()
}else if(argument[2] == 'create'){
    if(argument.length<6){
        console.error('Usage: node pets.js create AGE KIND NAME');
        exit(1);
    }else{
        commands.create()
    }
} else if (argument[2] == 'update'){
    if(argument.length<7){
        console.error('Usage: node pets.js update INDEX AGE KIND NAME')
    } else {
        commands.update()
    }
} else if (argument[2] == 'destroy'){
    if(argument[3] === undefined){
        console.error('Usage: node pets.js destroy INDEX')
    } else {
        commands.destroy()
    }
}
