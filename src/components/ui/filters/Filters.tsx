import React from "react";
import styles from "./Filters.module.scss";

interface BubbleFiltersProps {
  filters: string[];
  selected: string; // The currently selected filter
  onFilterChange: (filter: string) => void; // Callback function to update the parent’s state
}

const BubbleFilters: React.FC<BubbleFiltersProps> = ({
  filters,
  selected,
  onFilterChange,
}) => {
  return (
    <div className={styles.container}>
      {filters.map((filter) => (
        <div
          key={filter}
          onClick={() => onFilterChange(filter)} // Update the parent when a bubble is clicked
          className={`${styles.filter} ${selected === filter ? styles.selected : ""}`}
        >
          {filter}
        </div>
      ))}
    </div>
  );
};

export default BubbleFilters;
