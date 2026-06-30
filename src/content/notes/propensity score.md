This is a way to control for multiple possible confounders .

$$
p(X) = Pr(Z = 1|X)
$$
Z = primary risk factor

Estimate the propensity score (relationship between Z and the X's using logistic regression)
Stratifies into quantiles on the estimated propensity score ranging from low-high
Estimate the risk factor effect on the outcome within each propensity score quantiles
Pool all estimates, investigate the assocation between Y and Z, controlling for all the propensity scores