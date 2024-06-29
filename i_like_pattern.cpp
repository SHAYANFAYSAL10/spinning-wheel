#include <bits/stdc++.h>
using namespace std;

void print(int i, char t)
{
    char c;
    if (t == 'a')
    {
        c = 96 + i;
        cout << c;
    }
    else
    {
        cout << i;
    }
}

main()
{
    int n;
    char t;
    cin >> n >> t;
    if (n < 1)
        cout << "N needs to be greater than '0'.";
    else if (n > 26)
        cout << "N needs to smaller than '27'.";
    else if (t != '1' && t != 'a')
        cout << "T needs to be either '1' or 'a'.";
    else
    {
        for (int i = 1; i <= n; i++)
        {
            if (i == 1)
            {
                for (int j = 1; j <= n; j++)
                {
                    print(j, t);
                }
                cout << endl;
            }
            else if (i == n)
            {
                for (int j = n; j > 0; j--)
                {
                    print(j, t);
                }
                cout << endl;
            }
            else
            {
                print(i, t);
                for (int j = 2; j < n; j++)
                {
                    cout << " ";
                }
                print(n - i + 1, t);
                cout << endl;
            }
        }
    }
}