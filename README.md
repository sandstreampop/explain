# explain
explain is a CLI tool that brings Wikipedia to your terminal. Fetches a summary for a given term. Built with [Deno](https://deno.land).

### Installing explain
[Make sure that you have installed Deno first.](https://deno.land/manual/getting_started/installation) Then run the following command:

```
deno install -n explain --allow-net https://raw.githubusercontent.com/sandstreampop/explain/main/mod.ts
```

### Usage
The syntax is `explain <term>`.

Whitespace is allowed.

A list of more specific terms to choose from is presented when there is more than one match.

### Example
```
explain heat death paradox
```

<details><summary>Output</summary>Formulated in 1862 by Lord Kelvin, Hermann von Helmholtz and William John Macquorn Rankine, the heat death paradox, also known as Clausius's paradox and thermodynamic paradox, is a reductio ad absurdum argument that uses thermodynamics to show the impossibility of an infinitely old universe. Assuming that the universe is eternal, a question arises: How is it that thermodynamic equilibrium has not already been achieved?</details>