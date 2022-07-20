const idioms = await fetch("./idioms.csv")
  .then((data)=>(data.body))
  .then(async(stream)=>(
    await stream.getReader().read()
      .then((idioms)=>(
        new TextDecoder().decode(idioms.value)
      ))
  ))
  .then((idioms)=>(
    idioms.split("\n").map((idiom)=>{
      let result = [];
      let left = 0;
      for(let right=0; right<idiom.length; right++){
        if(idiom[left]==='"'){
          right = idiom.indexOf('"', left+1);
          result.push(idiom.slice(left+1, right))
          left = right+2;
          right = left+1;
        }
        else if(idiom[right]===","){
          result.push(idiom.slice(left, right))
          left=right+1;
        }
        else if(right===idiom.length-1){
          result.push(idiom.slice(left))
        }
      }
      return result;
    })
  ));

console.log(idioms)

const sokdam = document.getElementById("sokdam");
const meaning = document.getElementById("meaning")
const from = document.getElementById("from");

document.addEventListener("click", (event)=>{
  const i = Math.floor(Math.random() * idioms.length);
  const idiom = idioms[i];
  sokdam.innerText = idiom[0];
  meaning.innerText = idiom[1];
  from.innerHTML = `출처: ${idiom[2]}`;
});