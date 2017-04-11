# StateStruct 
### immutable structure for state with value, status, error, and timestamp

#### Example
```js
import State from 'state-struct';

let value = State.createEmpty();
let prevValue = value;

console.log(value.isEmpty()); // true
value = value.setValue(1); // all modification methods return new object and don`t modify current
console.log(value.isEmpty()); // false
console.log(value.getValue()); // 1

console.log(prevValue === value); // false 
value.setValue(2); 
console.log(value.getValue()); // 1 because it`s immutable object 

console.log(value.setStatus('LOADING').hasStatus()); // true 
console.log(State.createEmpty().setStatus('LOADING').isEmpty()); // false 
console.log(State.createEmpty().setStatus('LOADING').hasValue()); // false 

```