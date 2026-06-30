# Introductory Econometrics: A Modern Approach - Notes

## Introduction to Econometrics
- Econometrics involves developing statistical methods to estimate economic relationships, test theories, and evaluate policies.
- Unlike experimental data, **non-experimental data** are collected without controlled conditions, making causal inference more challenging.
- Economic models use **mathematical equations** to describe relationships, often based on **utility maximization**.
- A key question in econometrics: **Have enough other factors been held fixed to establish causality?**

## Basic Econometric Model
- A simple econometric model can be written as:

$$
Y = f(X_1, X_2, X_3, X_4, X_5, X_6, X_7)
$$

where:
- \( Y \) = hours spent in criminal activities
- \( X_1 \) = "wage" for an hour spent in criminal activity
- \( X_2 \) = hourly wage in legal employment
- \( X_3 \) = income other than from crime or employment
- \( X_4 \) = probability of getting caught
- \( X_5 \) = probability of conviction if caught
- \( X_6 \) = expected sentence if convicted
- \( X_7 \) = age

- The function \( f(.) \) must be specified before an econometric analysis can proceed.
- The error term \( u \) captures unobserved factors affecting \( Y \).

## Econometric Model of Crime
A typical econometric model formalizing the economic model of crime:

$$
\text{crime} = \beta_0 + \beta_1 \text{wage} + \beta_2 \text{othinc} + \beta_3 \text{freqarr} + \beta_4 \text{freqconv} + \beta_5 \text{avgsen} + \beta_6 \text{age} + u
$$

where:
- **crime** = measure of frequency of criminal activity
- **wage** = wage from legal employment
- **othinc** = other sources of income
- **freqarr** = frequency of arrests
- **freqconv** = frequency of convictions
- **avgsen** = average sentence length
- **age** = individual's age
- **\( u \)** = error term capturing unobserved variables

### Dealing with the Error Term
- We can never completely eliminate \( u \), making its treatment crucial in econometrics.
- The error term contains factors like **unobserved individual traits, omitted variables, and measurement errors**.

## Types of Data in Econometrics
### 1. Cross-Sectional Data
- Observations taken at a given point in time across different individuals, households, firms, cities, etc.
- Assumed to be randomly sampled from the population.
- Potential issues include **sample selection bias** and **spatial correlation** (e.g., similar businesses located near each other may not be truly independent).

### 2. Time Series Data
- Observations of variables over time (e.g., GDP, inflation, stock prices).
- Often exhibits **autocorrelation**, making independent observation assumptions problematic.
- Should be stored in **chronological order**.

### 3. Pooled Cross Sections
- Combination of two or more cross-sectional datasets at different time points.
- Each sample is drawn independently in different years.

### 4. Panel Data (Longitudinal Data)
- Observes the same cross-sectional units (e.g., individuals, firms) over multiple time periods.
- Allows researchers to control for unobserved characteristics that do not change over time.
- Facilitates causal inference by analyzing changes within units.

## Causal Inference in Econometrics
- **Key Question**: Have enough other factors been held fixed to make a case for causality?
- Counterfactual reasoning is central to causal inference.
- Example: Estimating the effect of a job training program on wages involves comparing outcomes **with** and **without** training under identical conditions.

## Simple Linear Regression Model
A basic linear regression equation:

$$
Y = \beta_0 + \beta_1 X + u
$$

where:
- \( Y \) = dependent variable
- \( X \) = independent variable
- \( \beta_0 \) = intercept
- \( \beta_1 \) = slope (measuring the change in \( Y \) for a one-unit change in \( X \))
- \( u \) = error term

The slope coefficient \( \beta_1 \) is the **ceteris paribus** effect of \( X \) on \( Y \).

### Ordinary Least Squares (OLS) Estimation
OLS estimates \( \beta_0 \) and \( \beta_1 \) by minimizing the **sum of squared residuals**:

$$
\sum (Y_i - \hat{Y}_i)^2
$$

where:
- \( Y_i \) = actual values
- \( \hat{Y}_i \) = predicted values from the regression line

### Assumptions of OLS Regression
1. **Linearity in Parameters**: The relationship is modeled as a linear function of the parameters:
   
   $$
   Y = \beta_0 + \beta_1 X + u
   $$

2. **Random Sampling**: Data are collected through a random process.
3. **Sample Variation in \( X \)**: The independent variable \( X \) must vary.
4. **Zero Conditional Mean**: The error term has an expected value of zero given \( X \):

   $$
   E(u | X) = 0
   $$

5. **Homoskedasticity**: The variance of \( u \) is constant across values of \( X \):

   $$
   Var(u | X) = \sigma^2
   $$

If any of these assumptions fail, OLS may produce **biased or inefficient estimates**.

## Interpreting Regression Output
- The fitted regression equation provides **predicted values** for \( Y \) at different values of \( X \).
- **R-Squared** measures the proportion of variance in \( Y \) explained by \( X \):

  $$
  R^2 = 1 - \frac{\sum (Y_i - \hat{Y}_i)^2}{\sum (Y_i - \bar{Y})^2}
  $$

  - \( R^2 \) close to 1: Strong fit.
  - \( R^2 \) close to 0: Weak fit.

## Binary (Dummy) Variables in Regression
- Used to capture categorical effects (e.g., gender, participation in a program).
- Example:

  $$
  Y = \beta_0 + \beta_1 D + u
  $$

  where \( D = 1 \) if condition applies, otherwise \( D = 0 \).

## Extensions and Considerations
- **Log Models**: Used when relationships are multiplicative:
  
  $$
  \log(Y) = \beta_0 + \beta_1 \log(X) + u
  $$

- **Heteroskedasticity**: If \( Var(u | X) \) changes with \( X \), OLS standard errors may be incorrect.
- **Simultaneous Equations**: If \( X \) is determined by \( Y \), simple OLS is inappropriate.

## Conclusion
- OLS is a foundational tool in econometrics, but its assumptions must be carefully considered.
- Understanding data structure (cross-sectional, time-series, panel) is critical for appropriate model selection.
- The ultimate goal is **causal inference**, ensuring that relationships reflect actual effects rather than spurious correlations.
