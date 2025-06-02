# Code Citations

## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.i
```


## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.id);
      if (existingItem
```


## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
```


## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item,
```


## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        
```


## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity
```


## License: unknown
https://github.com/Dreis27/shopping-cart/blob/0be3f6f945f653284f75f6a7db290fd43bc260d6/src/App.jsx

```
= prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    })
```

