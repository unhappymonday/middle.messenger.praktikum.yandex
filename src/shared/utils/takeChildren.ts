import type { IBlockChild, TBlockProps } from "@/shared/Components/Block/types";

export const takeChildren = (root: TBlockProps, ids: string[]): IBlockChild[] =>
  ids.map((placeholderId) => {
    const index = root.__children!.findIndex(
      (child) => child.placeholderId === placeholderId,
    );

    if (index === -1) {
      throw new Error(
        `Не найден дочерний компонент с placeholder ${placeholderId}`,
      );
    }

    return root.__children!.splice(index, 1)[0];
  });
