---
navhome: /developer/docs/
sort: 4
---

# `:book  $%  "buccen"` 

`{$book p/(list {{aura @} moss})}`: mold which recognizes a union tagged by head atom.

## Normalizes to

For any item `i` in `p`, a cell whose head is the atom `q.p.i.p`,
and whose tail recognizes `q.i.p`.

Void if `p` is empty.

## Defaults to

For the first item `i` in `p`, the cell `[q.p.i.p $:q.i.p]`.
Crashes if `p` is empty.

## Syntax 

Regular form: *2-running*.

## Discussion

A book is a tagged union, an extremely common data model.

Each item in a book is called a "page."  Make sure the first page
in the book terminates, or the default will be an infinite loop!

## Examples

```
~zod:dojo> =foo :book({$foo p/@ud q/@ud} {$bar p/@ud})

~zod:dojo> (foo [%bar 37])
[%bar p=37]

~zod:dojo> $:foo
[%foo p=0 q=0]~
```

```
~zod:dojo> =foo $%({$foo p/@ud q/@ud} {$bar p/@ud})

~zod:dojo> (foo [%bar 37])
[%bar p=37]

~zod:dojo> $:foo
[%foo p=0 q=0]~
```
