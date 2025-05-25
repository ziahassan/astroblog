---
title: Introductory Econometrics A Modern Approach (MindTap Course List) by Jeffrey M. Wooldridge.pdf
author: 
Title: Introductory Econometrics A Modern Approach (MindTap Course List) by Jeffrey M. Wooldridge.pdf
source: api_book
readDate: 2025-01-31
publishDate: 2025-05-24
---
# Introductory Econometrics A Modern Approach (Mi...

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/default-book-icon-1.a08c56e2fedd.png)

## Metadata
- Author: 
- Full Title: Introductory Econometrics A Modern Approach (MindTap Course List) by Jeffrey M. Wooldridge.pdf
- Category: #books

## Highlights
- Econometrics is based upon the development of statistical methods for estimating economic relationships, testing economic theories, and evaluating and implementing government and business policy.
- econometric methods can be used in economic areas that have nothing to do with macroeconomic forecasting
- Nonexperimental data are not accumulated through controlled experiments on individuals, firms, or segments of the economy
- it is often impossible, prohibitively expensive, or morally repugnant to conduct the kinds of controlled experiments that would be needed to address economic issues
- the first step in any empirical analysis is the careful formulation of the question of interest
- An economic model consists of mathematical equations that describe various relationships
- The basic premise underlying these models is utility maximization
- Under general assumptions, we can derive an equation describing the amount of time spent in 
  criminal activity as a function of various factors. We might represent such a function as
  y 5 f 1x1, x2, x3, x4, x5, x6, x72, [1.1]
  where
  y 5 hours spent in criminal activities,
  x1 5 “wage” for an hour spent in criminal activity,
  x2 5 hourly wage in legal employment,
  x3 5 income other than from crime or employment,
  x4 5 probability of getting caught,
  x5 5 probability of being convicted if caught,
  x6 5 expected sentence if convicted, and
  x7 5 age.
- This function depends on an underlying util-
  ity function, which is rarely known
- there are cases in which formal derivations provide insights that intuition can overlook
- Take equation (1.1) as an example. The form of the 
  function f(.) must be specified before we can undertake an econometric analysis
- The term u contains unobserved factors
- The ambiguities inherent in the economic model of crime are resolved by specifying a particular 
  econometric model:
  crime 5 b0 1 b1wage 1 b2othinc 1 b3 freqarr 1 b4 freqconv
  1 b5avgsen 1 b6age 1 u, [1.3]
  where
  crime 5 some measure of the frequency of criminal activity,
  wage 5 the wage that can be earned in legal employment,
  othinc 5 the income from other sources (assets, inheritance, and so on),
  freqarr 5 the frequency of arrests for prior infractions (to approximate the probability of arrest),
  freqconv 5 the frequency of conviction, and
  avgsen 5 the average sentence length after conviction
- we can never eliminate u entirely. In fact, dealing with this error term or disturbance 
  term is perhaps the most important component of any econometric analysis.
- In the economic model of crime example, we would start with an econometric model 
  such as (1.3) and use economic reasoning and common sense as guides for choosing the variables. 
  Although this approach loses some of the richness of economic analysis, it is commonly and effec-
  tively applied by careful researchers
- ification. In the economic model of crime example, we would start with an econometric model 
  such as (1.3) and use economic reasoning and common sense as guides for choosing the variables. 
  Although this approach loses some of the richness of economic analysis, it is commonly and effec-
  tively applied by careful researchers.
  Once an econometric model such as (1.3) or (1.4) has been specified, various hypotheses of 
  interest can be stated in terms of the unknown parameters. For example, in equation (1.3), we might 
  hypothesize that wage, the wage that can be earned in legal employment, has no effect on criminal 
  behavior. In the context of this particular econometric model, the hypothesis is equivalent to b1 5 0.
- A cross-sectional data set consists of a sample of individuals, households, firms, cities, states, countries, 
  or a variety of other units, taken at a given point in time
- An important feature of cross-sectional data is that we can often assume that they have been 
  obtained by random sampling from the underlying population
- If, for example, wealthier families are less likely to disclose their wealth, then the result-
  ing sample on wealth is not a random sample from the population of all families. This is an illustra-
  tion of a sample selection problem, an advanced topic that we will discuss in Chapter 17.
- Another violation of random sampling occurs when we sample from units that are large relative to 
  the population, particularly geographical units. The potential problem in such cases is that the popula-
  tion is not large enough to reasonably assume the observations are independent draws. For example, 
  if we want to explain new business activity across states as a function of wage rates, energy prices, 
  corporate and property tax rates, services provided, quality of the workforce, and other state charac-
  teristics, it is unlikely that business activities in states near one another are independent
- All econometrics and statistics 
  software packages assign an observation number to each data unit. Intuition should tell you that, for 
  data such as that in Table 1.1, it does not matter which person is labeled as observation 1, which per-
  son is called observation 2, and so on. The fact that the ordering of the data does not matter for econo-
  metric analysis is a key feature of cross-sectional data sets obtained from random sampling.
- A time series data set consists of observations on a variable or several variables over time.
- A key feature of time series data that makes them more difficult to analyze than cross-sectional 
  data is that economic observations can rarely, if ever, be assumed to be independent across time
- When econometric methods are 
  used to analyze time series data, the data should be stored in chronological order
- e data sets have both cross-sectional and time series features. For example, suppose that two 
  cross-sectional household surveys are taken in the United States, one in 1985 and one in 1990. 
  In 1985, a random sample of households is surveyed for variables such as income, savings, fam-
  ily size, and so on. In 1990, a new random sample of households is taken using the same survey 
  questions. To increase our sample size, we can form a pooled cross section by combining the 
  two years.
    - Note: SO What makes this different from time series?
- A panel data (or longitudinal data) set consists of a time series for each cross-sectional member 
  in the data set.
- The key feature of panel data that distinguishes them from a pooled cross section is that the same 
  cross-sectional units (individuals, firms, or counties in the preceding examples) are followed over a 
  given time period
- A second point is that the two years of data for city 1 fill the first two rows or observations, 
  ­observations 3 and 4 correspond to city 2, and so on. Because each of the 150 cities has two rows of 
  data, any econometrics package will view this as 300 observations. This data set can be treated as a 
  pooled cross section, where the same cities happen to show up in each year. But, as we will see in 
  Chapters 13 and 14, we can also use the panel structure to analyze questions that cannot be answered 
  by simply viewing this as a pooled cross section.
- As we will see, the use of more than one observation can facilitate 
  causal inference in situations where inferring causality would be very difficult if only a single cross 
  section were available. A second advantage of panel data is that they often allow us to study the 
  importance of lags in behavior or the result of decision making
- The key question in most empirical studies is: Have enough other factors 
  been held fixed to make a case for causality?
- 1
- The notion of ceteris paribus also can be described through counterfactual reasoning, which 
  has become an organizing theme in analyzing various interventions, such as policy changes. The idea 
  is to imagine an economic unit, such as an individual or a firm, in two or more different states of the 
  world. For example, consider studying the impact of a job training program on workers’ earnings. 
  For each worker in the relevant population, we can imagine what his or her subsequent earnings 
  would be under two states of the world: having participated in the job training program and having 
  not participated. By considering these counterfactual outcomes (also called potential outcomes), 
  we easily “hold other factors fixed” because the counterfactual thought experiment applies to each 
  individual separately. We can then think of causality as meaning that the outcome—in this case, labor 
  ­earnings—in the two states of the world differs for at least some indiviuals. The fact that we will 
  eventually observe each worker in only one state of the world raises important problems of estima-
  tion, but that is a separate issue from the issue of what we mean by causality. We formally introduce 
  an apparatus for discussing counterfactual outcomes in Chapter 2.
- If the levels of fertilizer are assigned to plots independently of other plot 
  ­features that affect yield—that is, other characteristics of plots are completely ignored when deciding 
  on ­fertilizer amounts—then we are in business
- If a person is chosen from the population and given 
  another year of education, by how much will his or her wage increase? As with the previous exam-
  ples, this is a ceteris paribus question, which implies that all other factors are held fixed while another 
  year of education is given to the person. Notice the element of counterfactual reasoning here: we can 
  imagine the wage of each individual varying with different levels of education, that is, in different 
  states of the world. Eventually, we obtain data on each worker in only one state of the world: the 
  education level they actually wound up with, through perhaps a complicated process of intellectual 
  ability, motivation for learning, parental input, and societal influences.
    - Note: is this basically my multiple worlds theory that if i had access to an alternate universe i could maybe know more about do experiments and all of that
- The planner would choose a group of people 
  and randomly assign each person an amount of education; some people are given an eighth-grade 
  education, some are given a high school education, some are given two years of college, and so on. 
  Subsequently, the planner measures wages for this group of people (where we assume that each per-
  son then works in a job). The people here are like the plots in the fertilizer example, where education 
  plays the role of fertilizer and wage rate plays the role of soybean yield. As with Example 1.3, if levels 
  of education are assigned independently of other characteristics that affect productivity (such as expe-
  rience and innate ability), then an analysis that ignores these other factors will yield useful results. 
  Again, it will take some effort in Chapter 2 to justify this claim; for now, we state it without support.
- Even though experimental data cannot be obtained for measuring the return to education, we can 
  certainly collect nonexperimental data on education levels and wages for a large group by sampling 
  randomly from the population of working people. Such data are available from a variety of surveys 
  used in labor economics, but these data sets have a feature that makes it difficult to estimate the 
  ceteris paribus return to education
- If, as is likely, a city’s decision on how many police officers to hire 
  is correlated with other city factors that affect crime, then the data must be viewed as nonexperimental. 
  In fact, one way to view this problem is to see that a city’s choice of police force size and the amount of 
  crime are simultaneously determined. We will explicitly address such problems in Chapter 16.
    - Note: It hurts my brainbut I think I get it.Non experimental datameans that there are so many variables affecting the Outcome that it's hard to tease them apart
- The expectations hypothesis from financial economics states that, given all information available 
  to investors at the time of investing, the expected return on any two investments is the same. For 
  ­example, consider two possible investments with a three-month investment horizon, purchased at the 
  same time: (1) Buy a three-month T-bill with a face value of $10,000, for a price below $10,000; in 
  three months, you receive $10,000. (2) Buy a six-month T-bill (at a price below $10,000) and, in three 
  months, sell it as a three-month T-bill. Each investment requires roughly the same amount of initial 
  capital, but there is an important difference. For the first investment, you know exactly what the return 
  is at the time of purchase because you know the initial price of the three-month T-bill, along with its 
  face value. This is not true for the second investment: although you know the price of a six-month 
  T-bill when you purchase it, you do not know the price you can sell it for in three months. Therefore, 
  there is uncertainty in this investment for someone who has a three-month investment horizon
- 7 The Expectations Hypothesis
  The expectations hypothesis from financial economics states that, given all information available 
  to investors at the time of investing, the expected return on any two investments is the same. For 
  ­example, consider two possible investments with a three-month investment horizon, purchased at the 
  same time: (1) Buy a three-month T-bill with a face value of $10,000, for a price below $10,000; in 
  three months, you receive $10,000. (2) Buy a six-month T-bill (at a price below $10,000) and, in three 
  months, sell it as a three-month T-bill. Each investment requires roughly the same amount of initial 
  capital, but there is an important difference. For the first investment, you know exactly what the return 
  is at the time of purchase because you know the initial price of the three-month T-bill, along with its 
  face value. This is not true for the second investment: although you know the price of a six-month 
  T-bill when you purchase it, you do not know the price you can sell it for in three months. Therefore, 
  there is uncertainty in this investment for someone who has a three-month investment horizon.
  The
- The actual returns on these two investments will usually be different. According to the expecta-
  tions hypothesis, the expected return from the second investment, given all information at the time of 
  investment, should equal the return from purchasing a three-month T-bill. This theory turns out to be 
  fairly easy to test, as we will see in Chapter 11.
- Suppose at your university you are asked to find the relationship between weekly hours spent study-
  ing (study) and weekly hours spent working (work). Does it make sense to characterize the problem as 
  inferring whether study “causes” work or work “causes” study? Explain.
- Much of applied econometric analysis begins with the following premise: y and x are two variables, 
  representing some population, and we are interested in “explaining y in terms of x,” or in “studying 
  how y varies with changes in x.” We discussed some examples in Chapter 1, including: y is soybean 
  crop yield and x is amount of fertilizer; y is hourly wage and x is years of education; and y is a com-
  munity crime rate and x is number of police officers.
- In writing down a model that will “explain y in terms of x,” we must confront three issues. First, 
  because there is never an exact relationship between two variables, how do we allow for other factors 
  to affect y? Second, what is the functional relationship between y and x? And third, how can we be 
  sure we are capturing a ceteris paribus relationship between y and x (if that is a desired goal)?
  We can resolve these ambiguities by writing down an equation relating y to x. A simple 
  equation is
  y 5 b0 1 b1x 1 u.
- When related by equation (2.1), the variables y and x have several different names used inter-
  changeably, as follows: y is called the dependent variable, the explained variable, the response 
  variable, the predicted variable, or the regressand; x is called the independent variable, the 
  explanatory variable, the control variable, the predictor variable, or the regressor. (The term 
  covariate is also used for x.) The terms “dependent variable” and “independent variable” are fre-
  quently used in econometrics. But be aware that the label “independent” here does not refer to the 
  statistical notion of independence between random variables (see Math Refresher B)
- The variable u, called the error term or disturbance in the relationship, represents factors other 
  than x that affect y. A simple regression analysis effectively treats all factors affecting y other than x as 
  being unobserved. You can usefully think of u as standing for “unobserved.”
- Equation (2.1) also addresses the issue of the functional relationship between y and x. If the other 
  factors in u are held fixed, so that the change in u is zero, Du 5 0, then x has a linear effect on y:
  Dy 5 b1Dx if Du 5 0.
- This means that b1 is the slope 
  parameter in the relationship between y and x, holding the other factors in u fixed; it is of primary 
  interest in applied economics. The intercept parameter b0, sometimes called the constant term, also 
  has its uses, although it is rarely central to an analysis.
- The linearity of equation (2.1) implies that a one-unit change in x has the same effect on y, 
  regardless of the initial value of x. This is unrealistic for many economic applications. For example, in 
  the wage-education example, we might want to allow for increasing returns: the next year of educa-
  tion has a larger effect on wages than did the previous year. We will see how to allow for such pos-
  sibilities in Section 2-4.
- As long as the intercept b0 is included in the equation, nothing is lost by assum-
  ing that the average value of u in the population is zero. Mathematically,
  E1u2 5 0.
- In Example 2.1, we 
  lose nothing by normalizing the unobserved factors affecting soybean yield, such as land quality, to 
  have an average of zero in the population of all cultivated plots. The same is true of the unobserved 
  factors in Example 2.2. Without loss of generality, we can assume that things such as average 
  ability are zero in the population of all working people. If you are not convinced, you should work 
  through Problem 2 to see that we can always redefine the intercept in equation (2.1) to make equa-
  tion (2.5) true.
- Assuming that u and x are uncorrelated goes a long way toward defining the sense in 
  which u and x should be unrelated in equation (2.1).
- it is possible for u to be uncorrelated with x while being correlated with functions of x, such 
  as x2. (See Section B-4 in Math Refresher B for further discussion.) This possibility is not acceptable 
  for most regression purposes, as it causes problems for interpreting the model and for deriving statis-
  tical properties. A better assumption involves the expected value of u given x.
- The crucial assumption is that the average value of u does 
  not depend on the value of x. We can write this assumption as
  E1u0x2 5 E1u2.
- When we combine mean independence 
  with assumption (2.5), we obtain the zero conditional mean assumption, E1u0x2 5 0. It is critical 
  to remember that equation (2.6) is the assumption with impact; assumption (2.5) essentially defines 
  the intercept, b0.
- This GPA equation tells us the average college GPA among all students who have a 
  given high school GPA. So suppose that hsGPA 5 3.6. Then the average colGPA for all high school 
  graduates who attend college with hsGPA 5 3.6 is 1.5 1 0.513.62 5 3.3. We are certainly not say-
  ing that every student with hsGPA 5 3.6 will have a 3.3 college GPA; this is clearly false. The PRF 
  gives us a relationship between the average level of y at different levels of x. Some students with 
  hsGPA 5 3.6 will have a college GPA higher than 3.3, and some will have a lower college GPA. 
  Whether the actual colGPA is above or below 3.3 depends on the unobserved factors in u
- Recognition that b1 is just a scaled version 
  of rxy highlights an important limitation of simple regression when we do not have experimental data: 
  in effect, simple regression is an analysis of correlation between two variables, and so one must be 
  careful in inferring causality.
- The 
  ­notation y^, read as “y hat,” emphasizes that the predicted values from equation (2.23) are estimates. 
  The intercept, b^
  0, is the predicted value of y when x 5 0, although in some cases it will not make 
  sense to set x 5 0. In those situations, b^
  0 is not, in itself, very interesting. When using (2.23) to com-
  pute predicted values of y for various values of x, we must account for the intercept in the calcula-
  tions. Equation (2.23) is also called the sample regression function (SRF) because it is the estimated 
  version of the population regression function E1y0x2 5 b0 1 b1x. It is important to remember that 
  the PRF is something fixed, but unknown, in the population. Because the SRF is obtained for a given 
  sample of data, a new sample will generate a different slope and intercept in equation (2.23)
- salary 5 963.191 1 18.501 roe
- can easily use (2.26) to compare predicted salaries at different values of roe. Suppose 
  roe 5 30. Then salary 5 963.191 1 18.5011302 5 1,518,221, which is just over $1.5 million. 
  However, this does not mean that a particular CEO whose firm had a roe 5 30 earns $1,518,221. 
  Many other factors affect salary. This is just our prediction from the OLS regression line (2.26).
- wage 5 20.90 1 0.54 educ [2.27]
  n 5 526.
- We always regress the dependent variable on the 
  independent variable.
- Thus, to obtain 
  (2.26), we regress salary on roe, or to obtain (2.28), we regress voteA on shareA.
- The OLS residual 
  associated with observation i, u^ i, is the difference between yi and its fitted value, as given in equation 
  (2.21). If u^ i is positive, the line underpredicts yi; if u^ i is negative, the line overpredicts yi. The ideal 
  case for observation i is when u^ i 5 0, but in most cases, every residual is not equal to zero. In other 
  words, none of the data points must actually lie on the OLS line.
- If the data points all lie on the same line, OLS provides a perfect fit to the data. In this case, 
  R2 5 1. A value of R2 that is nearly equal to zero indicates a poor fit of the OLS line: very little of 
  the variation in the yi is captured by the variation in the y^i (which all lie on the OLS regression line). 
  In fact, it can be shown that R2 is equal to the square of the sample correlation coefficient between yi 
  and y^i. This is where the term “R-squared” came from. (The letter R was traditionally used to denote 
  an estimate of a population correlation coefficient, and its usage has survived in regression analysis.)
- Using the 
  R-squared (rounded to four decimal places) reported for this equation, we can see how much of 
  the variation in salary is actually explained by the return on equity. The answer is: not much. The 
  firm’s return on equity explains only about 1.3% of the variation in salaries for this sample of 209 
  CEOs.
- It is still possible that (2.39) is a good 
  estimate of the ceteris paribus relationship between salary and roe; whether or not this is true 
  does not depend directly on the size of R-squared.
- A constant elasticity model is
  log1salary2 5 b0 1 b1log1sales2 1 u,
- Unbiasedness generally fails if any of our four assumptions fail. This means that it is important to 
  think about the veracity of each assumption for a particular application. Assumption SLR.1 requires 
  that y and x be linearly related, with an additive disturbance. This can certainly fail. But we also know 
  that y and x can be chosen to yield interesting nonlinear relationships. Dealing with the failure of 
  (2.47) requires more advanced methods that are beyond the scope of this text.
- This equation predicts that if student eligibility in the lunch program increases by 10 percentage 
  points, the percentage of students passing the math exam falls by about 3.2 percentage points. Do 
  we really believe that higher participation in the lunch program actually causes worse performance? 
  Almost certainly not. A better explanation is that the error term u in equation (2.54) is correlated with 
  lnchprg. In fact, u contains factors such as the poverty rate of children attending school, which affects 
  student performance and is highly correlated with eligibility in the lunch program. Variables such as 
  school quality and resources are also contained in u, and these are likely correlated with lnchprg
- When Var1u0x2 depends on x, the error term is said to exhibit heteroskedasticity (or nonconstant 
  variance). Because
- Simple regression can also be applied to the case where x is a binary variable, often called a 
  dummy variable in the context of regression analysis. As the name “binary variable” suggests, x 
  takes on only two values, zero and one. These two values are used to put each unit in the population 
  into one of two groups represented by x 5 0 and x 5 1. For example, we can use a binary variable to 
  describe whether a worker participates in a job training program. In the spirit of giving our variables 
  descriptive names, we might use train to indicate participation: train 5 1 means a person participates; 
  train 5 0 means the person does not. Given a data set, we add an
- Assumption SLR.1 (Linear in Parameters)
  In the population model, the dependent variable, y, is related to the independent variable, x, and the error 
  (or disturbance), u, as
  y 5 b0 1 b1x 1 u,
  where b0 and b1 are the population intercept and slope parameters, respectively.
  Assumption SLR.2 (Random Sampling)
  We have a random sample of size n, 51xi,yi2: i 5 1, 2, c, n6, following the population model in 
  Assumption SLR.1.
  Assumption SLR.3 (Sample Variation in the Explanatory Variable)
  The sample outcomes on x, namely, 5xi, i 5 1, c, n6, are not all the same value.
  Assumption SLR.4 (Zero Conditional Mean)
  The error u has an expected value of zero given any value of the explanatory variable. In other words,
  E1u0x2 5 0.
  Assumption SLR.5 (Homoskedasticity)
  The error u has the same variance given any value of the explanatory variable. In other words,
  Var1u0x2 5 s2.
