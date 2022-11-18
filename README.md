# Football_Players
Being a huge fan of football for a huge chunk of my life, this task seemed too good to be true. I will be manipulating and visualing the data via exploratory data analysis in this football dataset which dates approximately back to the 2017/18 season. 

First we import the given libraries in our Jupyter Notebook Football_Players.ipynb and we load the dataset
Built with: Jupyter Notebook, Python 3.10, Pandas, Numpy, Seaborn, Matplotlib

![Screenshot (370)](https://user-images.githubusercontent.com/94113177/202510573-9966a140-a5bd-4060-ad17-99fa5f8554d6.png)


Lets take a look at all the different clubs we have across the world in this dataset with the help of the unique function 
![Screenshot (371)](https://user-images.githubusercontent.com/94113177/202510864-ae0a6c89-9936-422e-b0d3-7aee1ef324e3.png)

We usually don't pronounce the full name of a club, for example: Olympique Lyonnais is better known as OL Lyon.

Now when we play FIFA, we tend to think about the top players so let's view the 20 best players in the world at the time 

![Screenshot (372)](https://user-images.githubusercontent.com/94113177/202511669-9fe4e894-4e9c-42b9-8fc6-6ea664b862b4.png)

A bit of data cleaning here and there to fix our dataset for more compatibility.

Usually as a casual viewer of football or sports in general, we tend to know only the players who perform and play for the teams which compete at the highest level, for example: Real Madrid, Manchester City etc. So lets form a filtered datatset of players who belong to this elite tier.


![Screenshot (374)](https://user-images.githubusercontent.com/94113177/202513220-7d5df730-921f-4269-8076-38ea14eb8bd4.png)


![Screenshot (375)](https://user-images.githubusercontent.com/94113177/202513381-ec1136cc-3a99-42a7-ae0e-98f7215ea5e9.png)

![Screenshot (376)](https://user-images.githubusercontent.com/94113177/202514146-218158f1-6185-4aec-8c47-9e5c8f9491f2.png)

Lets observe the nationality of the players who play for each of these teams

With pairplot we can form permutations of graphs and visualisations comparing various columns and aspects
![Screenshot (377)](https://user-images.githubusercontent.com/94113177/202514347-f2b17e35-e848-45e8-a4ba-8b7a72c56a64.png)

![Screenshot (378)](https://user-images.githubusercontent.com/94113177/202514424-973f65ca-c17c-4d0a-966b-efd9e7a9e12d.png)


Its time we started correlating various descriptions about our given players, for example: their value in $ and their ages.

![Screenshot (380)](https://user-images.githubusercontent.com/94113177/202687961-59d47df1-350a-4ef7-9c24-c306422fd152.png)

We observe that as a player gets older, their value goes down as they become less efficient and their potential usually goes down.

![Screenshot (381)](https://user-images.githubusercontent.com/94113177/202688883-dea33115-96dd-4493-9aef-7c612a3b317e.png)


![Screenshot (382)](https://user-images.githubusercontent.com/94113177/202688984-bfe906bd-a0cf-428c-9986-a2c60ede81d9.png)


We use univariate data analysis with the help of pairplots, jointplots and distplots in seaborn to identify various trends that players with an overall rating of around 80.0-82.0 are valued around approximately 10-20 million $.




![Screenshot (383)](https://user-images.githubusercontent.com/94113177/202692138-b1710ff2-dd3c-4190-9a52-85f5feaa3f46.png)
![Screenshot (384)](https://user-images.githubusercontent.com/94113177/202692176-bbac81fa-20c4-4b9c-9996-876e6d0f92a3.png)



![Screenshot (385)](https://user-images.githubusercontent.com/94113177/202692212-3c45879b-e030-4358-928b-5d99bac08795.png)


Let us try to predict the potential of players using techniques like logistic regression.
We import the scikit learn library to implement this.

Using train-test split we have created a test and training dataset for our model prediction.![Screenshot (389)](https://user-images.githubusercontent.com/94113177/202694661-7c1658e0-36df-4b22-8ac6-413d03e3843f.png)


we see that the score is not of a suitable value and hence logistic regression is a bad fit for this 

![Screenshot (391)](https://user-images.githubusercontent.com/94113177/202694735-b2355e3a-0ed2-4c5c-ae6d-7c1543b467bb.png)

![Screenshot (392)](https://user-images.githubusercontent.com/94113177/202694761-9238a853-7afb-45f4-8c07-39ec23ae9b90.png)
 With the help of k nearest neighbours we have implemented a confusion matrix to see the performance of our knn model which is severely underperforming here, hence our data needs to be cleaned more.

