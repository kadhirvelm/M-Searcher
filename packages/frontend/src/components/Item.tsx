import { IItem } from "@minecraft/api";
import * as React from "react";
import styles from "./Item.module.scss";

export const Item: React.FC<{ item: IItem }> = ({ item }) => {
    return (
        <div className={styles.itemContainer}>
            <i className={`icon-minecraft ${item.className}`} />
            <div className={styles.details}>
                <div className={styles.displayName}>{item.item.displayName} <span className={styles.id}>({item.item.id})</span></div>
                <div>Stack size {item.item.stackSize}</div>
            </div>
        </div>
    )
}
