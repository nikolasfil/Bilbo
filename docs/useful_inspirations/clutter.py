
import itertools

lst = ['isbn','title','limit']

for i in range(1, len(lst) + 1):
    for j in itertools.combinations(lst, i):
        print(' && '.join(list(j)))
