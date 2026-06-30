$$\hat{S}(t) = \prod_{i\ for\ t_i < t} (1 - h_i)$$
The sample based survival estimate based on every time we recorded an event in this dataset. We do 1-h for every hazard at each time, multiply all those together to get the Kaplan Meier estimate.

> [!From GPT]
> The **Kaplan-Meier estimate** is for ungrouped data with individual event times. It gives the **cumulative survival probability** - the probability of surviving beyond time t. It's calculated by multiplying together the survival probabilities at each event time, creating a step function (curve) that drops at each event."
> 
> **Key distinction:**
> 
> - **(1 - h_t):** survival through ONE time point
> - **Ŝ(t):** survival through ALL time points up to t (cumulative)

What does the table for this to calculate look like?


Here's what the Kaplan-Meier calculation table looks like:

## Kaplan-Meier Table Structure

| Time (t) | Events (d) | At Risk (n) | Hazard h_i = d/n | Survival (1-h_i) | Cumulative S(t) |
|----------|------------|-------------|------------------|-------------------|-----------------|
| t₁       | d₁         | n₁          | d₁/n₁            | 1 - d₁/n₁         | 1 - d₁/n₁       |
| t₂       | d₂         | n₂          | d₂/n₂            | 1 - d₂/n₂         | (1-d₁/n₁)(1-d₂/n₂) |
| t₃       | d₃         | n₃          | d₃/n₃            | 1 - d₃/n₃         | (1-d₁/n₁)(1-d₂/n₂)(1-d₃/n₃) |
| ...      | ...        | ...         | ...              | ...               | ... |

## Example with Real Numbers

| Time | Deaths | At Risk | Hazard | 1-Hazard | Cumulative S(t) |
|------|--------|---------|--------|----------|-----------------|
| 0    | -      | 100     | -      | -        | 1.000           |
| 2    | 3      | 100     | 0.030  | 0.970    | 0.970           |
| 5    | 2      | 97      | 0.021  | 0.979    | 0.950           |
| 8    | 1      | 95      | 0.011  | 0.989    | 0.940           |
| 12   | 4      | 94      | 0.043  | 0.957    | 0.900           |

## Key Points:

- **At Risk (n)** decreases as people die or are censored
- **Hazard (h_i)** = deaths at time i / people at risk at time i  
- **1-h_i** = probability of surviving through that specific time point
- **S(t)** = product of ALL (1-h_i) values up to time t
- The survival curve is a **step function** that drops at each event time
- Between event times, S(t) remains constant

This creates the characteristic "staircase" shape of the Kaplan-Meier survival curve!


Note that this is S^ meaning that it's not the population, but this particular data.

The definition of the Kaplan Meier estimate is 

The Kaplan-Meier estimate is a non-parametric method for estimating the survival function from lifetime data. Here's the formal definition:

## Definition

For a sample with observed times t₁ < t₂ < ... < tₖ (distinct failure times), the Kaplan-Meier estimator is:

**Ŝ(t) = ∏[tᵢ ≤ t] (1 - dᵢ/nᵢ)**

Where:
- **dᵢ** = number of events (deaths/failures) at time tᵢ
- **nᵢ** = number of individuals at risk just before time tᵢ
- The product is taken over all observed event times tᵢ ≤ t

## Key Properties

1. **Step function**: Ŝ(t) decreases only at observed event times
2. **Right-continuous**: Ŝ(t) = P(T > t) where T is the survival time
3. **Initial condition**: Ŝ(0) = 1 (assuming no events at time 0)
4. **Handles censoring**: Censored observations contribute to the risk set but not to the event count

## Alternative Expression

The estimator can also be written as:

**Ŝ(t) = ∏[tᵢ ≤ t] (nᵢ - dᵢ)/nᵢ**

This represents the cumulative probability of surviving beyond time t, calculated as the product of conditional survival probabilities at each event time up to t.

The Kaplan-Meier estimator is the maximum likelihood estimator of the survival function when no parametric assumptions are made about the underlying survival distribution.

