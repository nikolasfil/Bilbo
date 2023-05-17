
import itertools

lst = ['isbn','title','limit','offset']

for i in range(len(lst),0,-1):
    for j in itertools.combinations(lst, i):
        print(' && '.join(list(j)))
