const fs = require('fs')

// // reading file 
// fs.readFile('./docs.txt', (err, data) =>{
//     if (err){
//         console.log(err);
//     }
//     console.log(data);
//     // to see the data in string
//     console.log(data.toString());
// })
// // to run this code it need some time in the mean time lets run smg
// console.log('this appear first')

//writing file 

// fs.writeFile('./docs.txt', 'hello node will be rewrite ', () =>{

//     console.log('file was written ');
// });

// fs.writeFile('./docs1.txt', 'this doc has empty now lets write somethig', () => {
//     console.log('now our empty document wont be empty again');
// });

 //directories
 //this code create a folder if the folder is no exist by the name we given
// if(!fs.existsSync('./mpn')) {
//   fs.mkdir('./mpn', (err) =>{
// if(err){
//     console.log(err);
// }
// console.log('folder created by name mpn');
// });  
// } else {
//     fs.rmdir('./mpn', (err) =>{
//         if(err){
//             console.log(err);

//         }
//         console.log('Folder deleted');
//     })
// }

//deleting

if(fs.existsSync('./mpn/deleteme.txt')) {
    fs.unlink('./mpn/deleteme.txt', (err) =>{
        if(err) {
            console.log(err);
        }
        console.log('file deleted');
    })
}